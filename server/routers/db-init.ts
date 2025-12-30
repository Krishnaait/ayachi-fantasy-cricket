import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

export const dbInitRouter = router({
  init: publicProcedure.mutation(async () => {
    const db = await getDb();
    if (!db) return { success: false, message: "Database not available" };

    try {
      // Create users table if not exists
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name TEXT NOT NULL,
          email VARCHAR(320) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(15),
          dateOfBirth TIMESTAMP NOT NULL,
          state VARCHAR(100) NOT NULL,
          role ENUM('user', 'admin') DEFAULT 'user' NOT NULL,
          isVerified INT DEFAULT 0 NOT NULL,
          resetToken VARCHAR(255),
          resetTokenExpiry TIMESTAMP,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
          lastSignedIn TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `);

      // Create teams table if not exists
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS teams (
          id INT AUTO_INCREMENT PRIMARY KEY,
          userId INT NOT NULL,
          matchId VARCHAR(100) NOT NULL,
          teamName VARCHAR(100) NOT NULL,
          captainId VARCHAR(100) NOT NULL,
          viceCaptainId VARCHAR(100) NOT NULL,
          totalCreditsUsed DECIMAL(5, 2) DEFAULT 0.00 NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
        )
      `);

      // Create teamPlayers table if not exists
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS teamPlayers (
          id INT AUTO_INCREMENT PRIMARY KEY,
          teamId INT NOT NULL,
          playerId VARCHAR(100) NOT NULL
        )
      `);

      // Create contests table if not exists
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS contests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          matchId VARCHAR(100) NOT NULL,
          name VARCHAR(200) NOT NULL,
          entryFee INT DEFAULT 0 NOT NULL,
          prizePool INT DEFAULT 0 NOT NULL,
          maxEntries INT NOT NULL,
          currentEntries INT DEFAULT 0 NOT NULL,
          status ENUM('upcoming', 'live', 'completed') DEFAULT 'upcoming' NOT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `);

      // Create contestEntries table if not exists
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS contestEntries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          contestId INT NOT NULL,
          userId INT NOT NULL,
          teamId INT NOT NULL,
          points DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
          rank INT,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `);

      return { success: true, message: "Database initialized successfully" };
    } catch (error: any) {
      console.error("Database initialization failed:", error);
      return { success: false, message: error.message };
    }
  }),
});
