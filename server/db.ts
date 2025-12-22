import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, teams, contests, userContestEntries, Team, Contest, UserContestEntry } from "../drizzle/schema";
import bcrypt from "bcryptjs";
import type { ResultSetHeader } from "mysql2";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// Restricted states where platform is not available
export const RESTRICTED_STATES = [
  "Andhra Pradesh",
  "Assam",
  "Odisha",
  "Telangana",
  "Nagaland",
  "Sikkim"
];

// User authentication functions
export async function createUser(userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth: Date;
  state: string;
}): Promise<{ success: boolean; message: string; userId?: number }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
    if (existingUser.length > 0) {
      return { success: false, message: "Email already registered" };
    }

    // Validate age (must be 18+)
    const age = Math.floor((Date.now() - userData.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) {
      return { success: false, message: "You must be 18 years or older to register" };
    }

    // Validate state (check restricted states)
    if (RESTRICTED_STATES.includes(userData.state)) {
      return { success: false, message: `Service not available in ${userData.state}` };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Insert user
    const result = await db.insert(users).values({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      state: userData.state,
      role: "user",
      isVerified: 0,
    }) as unknown as ResultSetHeader;

    return { success: true, message: "Registration successful", userId: Number(result.insertId) };
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    return { success: false, message: "Registration failed" };
  }
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (result.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Update last signed in
    await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, user.id));

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, message: "Login successful", user: userWithoutPassword };
  } catch (error) {
    console.error("[Database] Failed to login user:", error);
    return { success: false, message: "Login failed" };
  }
}

export async function getUserById(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (result.length === 0) return undefined;

  const { password: _, ...userWithoutPassword } = result[0];
  return userWithoutPassword;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function generateResetToken(email: string): Promise<{ success: boolean; message: string; token?: string }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return { success: false, message: "Email not found" };
    }

    // Generate random token
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    await db.update(users).set({
      resetToken: token,
      resetTokenExpiry: expiry
    }).where(eq(users.email, email));

    return { success: true, message: "Reset token generated", token };
  } catch (error) {
    console.error("[Database] Failed to generate reset token:", error);
    return { success: false, message: "Failed to generate reset token" };
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    const result = await db.select().from(users).where(eq(users.resetToken, token)).limit(1);
    
    if (result.length === 0) {
      return { success: false, message: "Invalid or expired token" };
    }

    const user = result[0];
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return { success: false, message: "Token has expired" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null
    }).where(eq(users.id, user.id));

    return { success: true, message: "Password reset successful" };
  } catch (error) {
    console.error("[Database] Failed to reset password:", error);
    return { success: false, message: "Password reset failed" };
  }
}

// Team management functions
export async function createTeam(teamData: {
  userId: number;
  teamName: string;
  captain: string;
  viceCaptain: string;
  players: string[];
  matchId?: string;
}): Promise<{ success: boolean; message: string; teamId?: number }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    const result = await db.insert(teams).values({
      userId: teamData.userId,
      teamName: teamData.teamName,
      captain: teamData.captain,
      viceCaptain: teamData.viceCaptain,
      players: JSON.stringify(teamData.players),
      matchId: teamData.matchId,
    }) as unknown as ResultSetHeader;

    return { success: true, message: "Team created successfully", teamId: Number(result.insertId) };
  } catch (error) {
    console.error("[Database] Failed to create team:", error);
    return { success: false, message: "Failed to create team" };
  }
}

export async function getUserTeams(userId: number): Promise<Team[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(teams).where(eq(teams.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user teams:", error);
    return [];
  }
}

// Contest functions
export async function getActiveContests(): Promise<Contest[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(contests);
    return result;
  } catch (error) {
    console.error("[Database] Failed to get contests:", error);
    return [];
  }
}

export async function joinContest(userId: number, contestId: number, teamId: number): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) {
    return { success: false, message: "Database not available" };
  }

  try {
    await db.insert(userContestEntries).values({
      userId,
      contestId,
      teamId,
      points: 0,
    });

    return { success: true, message: "Joined contest successfully" };
  } catch (error) {
    console.error("[Database] Failed to join contest:", error);
    return { success: false, message: "Failed to join contest" };
  }
}

export async function getUserContestEntries(userId: number): Promise<UserContestEntry[]> {
  const db = await getDb();
  if (!db) return [];

  try {
    const result = await db.select().from(userContestEntries).where(eq(userContestEntries.userId, userId));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get user contest entries:", error);
    return [];
  }
}
