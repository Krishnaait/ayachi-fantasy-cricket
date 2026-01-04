import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function debugCompletedScorecard() {
  // We need a completed match ID. Let's fetch recent matches first.
  console.log("Fetching recent matches to find a completed one...");
  const matchesRes = await axios.get(`${BASE_URL}/currentMatches?apikey=${API_KEY}&offset=0`);
  const completedMatch = matchesRes.data.data.find((m: any) => m.matchEnded);

  if (!completedMatch) {
    console.log("No completed matches found in currentMatches. Trying matches list...");
    const listRes = await axios.get(`${BASE_URL}/matches?apikey=${API_KEY}&offset=0`);
    const completedFromList = listRes.data.data.find((m: any) => m.matchEnded);
    if (!completedFromList) {
      console.error("No completed matches found at all.");
      return;
    }
    processMatch(completedFromList.id);
  } else {
    processMatch(completedMatch.id);
  }
}

async function processMatch(matchId: string) {
  console.log(`Testing scorecard for completed match ID: ${matchId}`);
  try {
    const response = await axios.get(`${BASE_URL}/match_scorecard?apikey=${API_KEY}&id=${matchId}`);
    console.log("Scorecard Data Structure:");
    console.log(JSON.stringify(response.data, null, 2).substring(0, 1000) + "...");
    
    if (response.data.data && response.data.data.batting) {
      console.log("Batting data found!");
    } else {
      console.log("No batting data found in match_scorecard. Checking match_info...");
      const infoRes = await axios.get(`${BASE_URL}/match_info?apikey=${API_KEY}&id=${matchId}`);
      console.log("Match Info Data Structure:");
      console.log(JSON.stringify(infoRes.data, null, 2).substring(0, 1000) + "...");
    }
  } catch (error) {
    console.error("Error fetching scorecard:", error);
  }
}

debugCompletedScorecard();
