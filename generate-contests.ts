import * as db from "./server/db";
import { getCurrentMatches, getMatchesList } from "./server/lib/cricketApi";

async function generateContests() {
  console.log("Starting automatic contest generation...");
  
  try {
    // 1. Fetch upcoming matches
    const currentMatches = await getCurrentMatches();
    const matchesList = await getMatchesList(0);
    
    const allMatches = [...currentMatches, ...matchesList];
    const activeMatches = allMatches.filter(m => !m.matchEnded);
    
    console.log(`Found ${activeMatches.length} active/upcoming matches.`);

    for (const match of activeMatches) {
      // Check if contests already exist for this match
      const existingContests = await db.getContestsByMatch(match.id);
      
      if (existingContests.length === 0) {
        console.log(`Generating contests for match: ${match.name} (${match.id})`);
        
        // Create a Mega Contest
        await db.createContest({
          matchId: match.id,
          name: "Mega Contest",
          totalSpots: 100,
          entryFee: "0", // Free to play
          prizePool: "Bragging Rights",
          type: "Mega",
        });

        // Create a Head-to-Head Contest
        await db.createContest({
          matchId: match.id,
          name: "Head-to-Head",
          totalSpots: 2,
          entryFee: "0",
          prizePool: "Skill Challenge",
          type: "H2H",
        });

        // Create a Practice Contest
        await db.createContest({
          matchId: match.id,
          name: "Practice Pool",
          totalSpots: 50,
          entryFee: "0",
          prizePool: "Experience",
          type: "Practice",
        });
      }
    }
    
    console.log("Contest generation completed successfully.");
  } catch (error) {
    console.error("Error generating contests:", error);
  }
}

generateContests();
