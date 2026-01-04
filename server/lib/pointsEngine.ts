import { getDb } from "../db";
import { contestEntries, teamPlayers, teams } from "../../drizzle/schema";
import { eq, inArray } from "drizzle-orm";
import { getFantasyScorecard } from "./cricketApi";

/**
 * Fantasy Point System (Standard)
 * Batting:
 * - Run: +1
 * - Boundary Bonus: +1
 * - Six Bonus: +2
 * - 30 Run Bonus: +4
 * - Half-century Bonus: +8
 * - Century Bonus: +16
 * - Duck (Dismissal for 0): -2 (Excluding Bowlers)
 * 
 * Bowling:
 * - Wicket (Excluding Run Out): +25
 * - Bonus (LBW / Bowled): +8
 * - 3 Wicket Bonus: +4
 * - 4 Wicket Bonus: +8
 * - 5 Wicket Bonus: +16
 * - Maiden Over: +12
 * 
 * Fielding:
 * - Catch: +8
 * - 3 Catch Bonus: +4
 * - Stumping: +12
 * - Run Out (Direct): +12
 * - Run Out (Indirect): +6
 */

export async function calculatePointsForMatch(matchId: string) {
  const db = await getDb();
  if (!db) return;

  console.log(`[PointsEngine] Calculating points for match: ${matchId}`);

  try {
    const scorecard = await getFantasyScorecard(matchId);
    if (!scorecard || !scorecard.data) {
      console.warn(`[PointsEngine] No scorecard data for match: ${matchId}`);
      return;
    }

    const playerPoints: Record<string, number> = {};

    // Process Batting
    scorecard.data.batting?.forEach((inning: any) => {
      inning.scores?.forEach((score: any) => {
        let pts = 0;
        const runs = parseInt(score.r) || 0;
        pts += runs; // 1 pt per run
        if (parseInt(score["4s"])) pts += parseInt(score["4s"]) * 1;
        if (parseInt(score["6s"])) pts += parseInt(score["6s"]) * 2;
        if (runs >= 100) pts += 16;
        else if (runs >= 50) pts += 8;
        else if (runs >= 30) pts += 4;
        
        if (runs === 0 && score.dismissalText && !score.dismissalText.includes("not out")) {
          pts -= 2;
        }
        
        playerPoints[score.pid] = (playerPoints[score.pid] || 0) + pts;
      });
    });

    // Process Bowling
    scorecard.data.bowling?.forEach((inning: any) => {
      inning.scores?.forEach((score: any) => {
        let pts = 0;
        const wickets = parseInt(score.w) || 0;
        pts += wickets * 25;
        if (wickets >= 5) pts += 16;
        else if (wickets >= 4) pts += 8;
        else if (wickets >= 3) pts += 4;
        
        if (parseInt(score.m)) pts += parseInt(score.m) * 12; // Maiden overs
        
        playerPoints[score.pid] = (playerPoints[score.pid] || 0) + pts;
      });
    });

    // Process Fielding (Catches/Stumpings from dismissal text if available)
    // Note: Full fielding stats often require a different API endpoint or detailed bbb data.
    // For now, we use the primary batting/bowling points.

    // Update Contest Entries
    const matchTeams = await db.select().from(teams).where(eq(teams.matchId, matchId));
    
    for (const team of matchTeams) {
      let totalTeamPoints = 0;
      const players = await db.select().from(teamPlayers).where(eq(teamPlayers.teamId, team.id));
      
      for (const p of players) {
        let pPts = playerPoints[p.playerId] || 0;
        if (p.playerId === team.captainId) pPts *= 2;
        if (p.playerId === team.viceCaptainId) pPts *= 1.5;
        totalTeamPoints += pPts;
      }

      await db.update(contestEntries)
        .set({ points: totalTeamPoints.toFixed(2) })
        .where(eq(contestEntries.teamId, team.id));
    }

    console.log(`[PointsEngine] Successfully updated points for match: ${matchId}`);
  } catch (error) {
    console.error(`[PointsEngine] Error calculating points for ${matchId}:`, error);
  }
}
