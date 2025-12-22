import { drizzle } from "drizzle-orm/mysql2";
import { sql } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

const db = drizzle(process.env.DATABASE_URL);

async function migrate() {
  try {
    console.log("Dropping existing tables...");
    await db.execute(sql`DROP TABLE IF EXISTS userContestEntries`);
    await db.execute(sql`DROP TABLE IF EXISTS contests`);
    await db.execute(sql`DROP TABLE IF EXISTS teams`);
    await db.execute(sql`DROP TABLE IF EXISTS users`);
    
    console.log("Creating users table...");
    await db.execute(sql`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(320) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15),
        dateOfBirth TIMESTAMP NOT NULL,
        state VARCHAR(100) NOT NULL,
        role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        isVerified INT NOT NULL DEFAULT 0,
        resetToken VARCHAR(255),
        resetTokenExpiry TIMESTAMP,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Creating teams table...");
    await db.execute(sql`
      CREATE TABLE teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        teamName VARCHAR(100) NOT NULL,
        captain VARCHAR(100),
        viceCaptain VARCHAR(100),
        players TEXT NOT NULL,
        matchId VARCHAR(100),
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Creating contests table...");
    await db.execute(sql`
      CREATE TABLE contests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contestName VARCHAR(200) NOT NULL,
        matchId VARCHAR(100) NOT NULL,
        totalSpots INT NOT NULL,
        filledSpots INT NOT NULL DEFAULT 0,
        entryFee INT NOT NULL DEFAULT 0,
        status ENUM('upcoming', 'live', 'completed') NOT NULL DEFAULT 'upcoming',
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Creating userContestEntries table...");
    await db.execute(sql`
      CREATE TABLE userContestEntries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        contestId INT NOT NULL,
        teamId INT NOT NULL,
        points INT NOT NULL DEFAULT 0,
        \`rank\` INT,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
