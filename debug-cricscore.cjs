const axios = require('axios');

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function testCricScore() {
  try {
    console.log("Testing /cricScore endpoint...");
    const response = await axios.get(`${BASE_URL}/cricScore`, {
      params: { apikey: API_KEY }
    });
    console.log("Status:", response.data.status);
    if (response.data.data) {
      console.log("Found", response.data.data.length, "matches");
      console.log("First match sample:", JSON.stringify(response.data.data[0], null, 2));
    } else {
      console.log("No data returned from /cricScore");
    }
  } catch (error) {
    console.error("Error testing /cricScore:", error.message);
  }
}

testCricScore();
