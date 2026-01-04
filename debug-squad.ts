import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";
const MATCH_ID = "5bb51dc4-f352-4c5b-8dc8-137d366b1d69"; // From screenshot

async function testSquad() {
  console.log(`Testing squad fetching for Match ID: ${MATCH_ID}`);
  
  try {
    // Test match_info
    console.log("\n--- Testing /match_info ---");
    const infoRes = await axios.get(`${BASE_URL}/match_info`, {
      params: { apikey: API_KEY, id: MATCH_ID }
    });
    console.log("Status:", infoRes.status);
    console.log("Has Squad:", infoRes.data.data?.hasSquad);

    // Test match_squad (Fantasy Squad)
    console.log("\n--- Testing /match_squad ---");
    const squadRes = await axios.get(`${BASE_URL}/match_squad`, {
      params: { apikey: API_KEY, id: MATCH_ID }
    });
    console.log("Status:", squadRes.status);
    if (squadRes.data && squadRes.data.data) {
      console.log("Squad Count:", squadRes.data.data.length);
      if (squadRes.data.data.length > 0) {
        console.log("First Player Sample:", JSON.stringify(squadRes.data.data[0], null, 2));
      }
    } else {
      console.log("No data field in response:", squadRes.data);
    }

  } catch (error: any) {
    console.error("Error:", error.message);
  }
}

testSquad();
