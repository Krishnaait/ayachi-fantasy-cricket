import mysql from "mysql2/promise";

const connectionString = "mysql://root:ybKGnBATKBJGslSnUENgtdXkCKpfceRZ@tramway.proxy.rlwy.net:56539/railway";

async function initDb() {
  console.log("Initializing database tables...");
  try {
    const connection = await mysql.createConnection(connectionString);
    
    // Create users table
    await connection.execute(`
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
    console.log("Users table created/verified.");

    // Create teams table
    await connection.execute(`
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
    console.log("Teams table created/verified.");

    // Create teamPlayers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS teamPlayers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        teamId INT NOT NULL,
        playerId VARCHAR(100) NOT NULL
      )
    `);
    console.log("TeamPlayers table created/verified.");

    // Create contests table
    await connection.execute(`
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
    console.log("Contests table created/verified.");

    // Create contestEntries table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contestEntries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        contestId INT NOT NULL,
        userId INT NOT NULL,
        teamId INT NOT NULL,
        points DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
        \`rank\` INT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    console.log("ContestEntries table created/verified.");

    await connection.end();
    console.log("Database initialization complete.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

initDb();
