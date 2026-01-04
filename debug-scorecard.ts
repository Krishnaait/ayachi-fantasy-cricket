import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function testScorecard() {
  // First, get a live match ID
  console.log("Fetching current matches to find a live ID...");
  try {
    const res = await axios.get(`${BASE_URL}/currentMatches`, {
      params: { apikey: API_KEY }
    });
    
    const matches = res.data.data;
    if (!matches || matches.length === 0) {
      console.log("No matches found.");
      return;
    }
    
    const matchId = matches[0].id;
    console.log(`Testing scorecard for Match ID: ${matchId} (${matches[0].name})`);
    
    // Test match_info (often contains score)
    console.log("\n--- Testing /match_info ---");
    const infoRes = await axios.get(`${BASE_URL}/match_info`, {
      params: { apikey: API_KEY, id: matchId }
    });
    console.log("Status:", infoRes.status);
    console.log("Data Sample:", JSON.stringify(infoRes.data.data?.score, null, 2));

    // Test match_scorecard (Fantasy Scorecard)
    console.log("\n--- Testing /match_scorecard ---");
    const scorecardRes = await axios.get(`${BASE_URL}/match_scorecard`, {
      params: { apikey: API_KEY, id: matchId }
    });
    console.log("Status:", scorecardRes.status);
    console.log("Data Sample:", JSON.stringify(scorecardRes.data.data?.scorecard?.slice(0, 1), null, 2));

  } catch (error: any) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response Data:", error.response.data);
    }
  }
}

testScorecard();
