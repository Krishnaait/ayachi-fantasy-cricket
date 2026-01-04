const axios = require('axios');

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function debug() {
  console.log("Fetching matches...");
  const res = await axios.get(`${BASE_URL}/currentMatches?apikey=${API_KEY}`);
  const matches = res.data.data;
  
  const completed = matches.find(m => m.matchEnded);
  if (!completed) {
    console.log("No completed matches found.");
    return;
  }
  
  console.log(`Testing match: ${completed.name} (${completed.id})`);
  const scorecardRes = await axios.get(`${BASE_URL}/match_scorecard?apikey=${API_KEY}&id=${completed.id}`);
  console.log("Scorecard Response Keys:", Object.keys(scorecardRes.data));
  
  if (scorecardRes.data.data) {
    console.log("Data Keys:", Object.keys(scorecardRes.data.data));
    console.log("Scorecard Sample:", JSON.stringify(scorecardRes.data.data, null, 2).substring(0, 1000));
  } else {
    console.log("No data field in response.");
  }
}

debug().catch(console.error);
