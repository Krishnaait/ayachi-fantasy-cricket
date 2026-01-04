import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connectionString = "mysql://root:ybKGnBATKBJGslSnUENgtdXkCKpfceRZ@tramway.proxy.rlwy.net:56539/railway";

async function testConnection() {
  console.log("Attempting to connect to database...");
  try {
    const connection = await mysql.createConnection(connectionString);
    console.log("Successfully connected to MySQL!");
    
    const [rows] = await connection.execute("SHOW TABLES");
    console.log("Tables in database:", rows);
    
    await connection.end();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
}

testConnection();
