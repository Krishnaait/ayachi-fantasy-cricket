const axios = require('axios');

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function debug() {
  const matchId = "5fe4923b-ac74-49d7-9322-5e39764d1c2d";
  console.log(`Testing match: ${matchId}`);
  const scorecardRes = await axios.get(`${BASE_URL}/match_scorecard?apikey=${API_KEY}&id=${matchId}`);
  
  if (scorecardRes.data.data && scorecardRes.data.data.scorecard) {
    const sc = scorecardRes.data.data.scorecard;
    console.log("Scorecard is an array of length:", sc.length);
    sc.forEach((inning, i) => {
      console.log(`\nInning ${i}: ${inning.inning}`);
      console.log("Batting count:", inning.batting ? inning.batting.length : 0);
      console.log("Bowling count:", inning.bowling ? inning.bowling.length : 0);
      if (inning.batting && inning.batting.length > 0) {
        console.log("Batting Sample:", JSON.stringify(inning.batting[0], null, 2));
      }
    });
  } else {
    console.log("No scorecard field in data.");
  }
}

debug().catch(console.error);
