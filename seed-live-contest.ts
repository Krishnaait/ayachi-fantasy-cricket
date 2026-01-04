import { getDb } from "./server/db";
import { contests } from "./drizzle/schema";
import { eq } from "drizzle-orm";

async function seedLiveContest() {
  const liveMatchId = "368e2e49-67be-4881-a18f-32828d143909"; // Desert Vipers vs MI Emirates
  
  console.log(`Seeding contests for live match: ${liveMatchId}`);
  
  const db = await getDb();
  if (!db) {
    console.error("Database not available");
    process.exit(1);
  }

  const existing = await db.select().from(contests).where(eq(contests.matchId, liveMatchId));
  
  if (existing.length > 0) {
    console.log("Contests already exist for this match.");
    return;
  }

  const newContests = [
    {
      matchId: liveMatchId,
      name: "Mega Contest",
      entryFee: 0,
      maxEntries: 1000,
      currentEntries: 0,
      prizePool: 0,
      status: "live" as const
    },
    {
      matchId: liveMatchId,
      name: "Head-to-Head",
      entryFee: 0,
      maxEntries: 2,
      currentEntries: 0,
      prizePool: 0,
      status: "live" as const
    },
    {
      matchId: liveMatchId,
      name: "Practice Contest",
      entryFee: 0,
      maxEntries: 100,
      currentEntries: 0,
      prizePool: 0,
      status: "live" as const
    }
  ];

  for (const contest of newContests) {
    await db.insert(contests).values(contest);
    console.log(`Created ${contest.name}`);
  }
  
  console.log("Seeding complete.");
  process.exit(0);
}

seedLiveContest().catch(err => {
  console.error(err);
  process.exit(1);
});
