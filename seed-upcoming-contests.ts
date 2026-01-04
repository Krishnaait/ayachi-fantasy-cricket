import { getDb } from "./server/db";
import { contests } from "./drizzle/schema";
import { eq } from "drizzle-orm";
import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function seedUpcomingContests() {
  console.log("Fetching upcoming matches...");
  let allMatches: any[] = [];
  
  for (let offset = 0; offset <= 100; offset += 25) {
    console.log(`Fetching matches with offset ${offset}...`);
    const response = await axios.get(`${BASE_URL}/matches?apikey=${API_KEY}&offset=${offset}`);
    if (response.data && response.data.data) {
      allMatches = [...allMatches, ...response.data.data];
    }
  }
  
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const upcomingMatches = allMatches.filter((m: any) => !m.matchStarted);
  console.log(`Found ${upcomingMatches.length} upcoming matches.`);

  for (const match of upcomingMatches) {
    const existing = await db.select().from(contests).where(eq(contests.matchId, match.id));
    
    if (existing.length > 0) {
      console.log(`Contests already exist for match: ${match.name}`);
      continue;
    }

    const newContests = [
      {
        matchId: match.id,
        name: "Mega Contest",
        entryFee: 0,
        maxEntries: 1000,
        currentEntries: 0,
        prizePool: 0,
        status: "upcoming" as const
      },
      {
        matchId: match.id,
        name: "Head-to-Head",
        entryFee: 0,
        maxEntries: 2,
        currentEntries: 0,
        prizePool: 0,
        status: "upcoming" as const
      }
    ];

    for (const contest of newContests) {
      await db.insert(contests).values(contest);
    }
    console.log(`Created contests for: ${match.name}`);
  }
  
  console.log("Seeding complete.");
  process.exit(0);
}

seedUpcomingContests().catch(err => {
  console.error(err);
  process.exit(1);
});
