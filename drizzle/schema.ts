import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  dateOfBirth: timestamp("dateOfBirth").notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  isVerified: int("isVerified").default(0).notNull(),
  resetToken: varchar("resetToken", { length: 255 }),
  resetTokenExpiry: timestamp("resetTokenExpiry"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Teams table for fantasy cricket
export const teams = mysqlTable("teams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  teamName: varchar("teamName", { length: 100 }).notNull(),
  captain: varchar("captain", { length: 100 }),
  viceCaptain: varchar("viceCaptain", { length: 100 }),
  players: text("players").notNull(), // JSON string of player IDs
  matchId: varchar("matchId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = typeof teams.$inferInsert;

// Contests table
export const contests = mysqlTable("contests", {
  id: int("id").autoincrement().primaryKey(),
  contestName: varchar("contestName", { length: 200 }).notNull(),
  matchId: varchar("matchId", { length: 100 }).notNull(),
  totalSpots: int("totalSpots").notNull(),
  filledSpots: int("filledSpots").default(0).notNull(),
  entryFee: int("entryFee").default(0).notNull(), // Always 0 for free-to-play
  status: mysqlEnum("status", ["upcoming", "live", "completed"]).default("upcoming").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contest = typeof contests.$inferSelect;
export type InsertContest = typeof contests.$inferInsert;

// User Contest Entries
export const userContestEntries = mysqlTable("userContestEntries", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contestId: int("contestId").notNull(),
  teamId: int("teamId").notNull(),
  points: int("points").default(0).notNull(),
  rank: int("rank"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type UserContestEntry = typeof userContestEntries.$inferSelect;
export type InsertUserContestEntry = typeof userContestEntries.$inferInsert;