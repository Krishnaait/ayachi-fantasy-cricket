const axios = require('axios');

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function debug() {
  const matchId = "5fe4923b-ac74-49d7-9322-5e39764d1c2d";
  console.log(`Testing squad for match: ${matchId}`);
  const squadRes = await axios.get(`${BASE_URL}/match_squad?apikey=${API_KEY}&id=${matchId}`);
  
  if (squadRes.data.data) {
    console.log("Squad Data Structure:");
    console.log(JSON.stringify(squadRes.data.data, null, 2).substring(0, 2000));
  } else {
    console.log("No data field in squad response.");
  }
}

debug().catch(console.error);
