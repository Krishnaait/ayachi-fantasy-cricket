import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function debugApi() {
  console.log("Testing CricketData API with key:", API_KEY);
  try {
    console.log("--- Testing currentMatches ---");
    const currentResponse = await axios.get(`${BASE_URL}/currentMatches`, {
      params: { apikey: API_KEY }
    });
    console.log("Current Matches Status:", currentResponse.status);
    console.log("Current Matches Count:", currentResponse.data.data?.length);

    console.log("--- Testing matches list (Upcoming) ---");
    const listResponse = await axios.get(`${BASE_URL}/matches`, {
      params: { apikey: API_KEY, offset: 0 }
    });
    console.log("Matches List Status:", listResponse.status);
    console.log("Matches List Count:", listResponse.data.data?.length);
    if (listResponse.data.data) {
      const upcoming = listResponse.data.data.filter((m: any) => !m.matchStarted);
      console.log("Upcoming Matches Count:", upcoming.length);
      if (upcoming.length > 0) {
        console.log("First Upcoming Match:", JSON.stringify(upcoming[0], null, 2));
      }
    }
    console.log("API Response Status:", response.status);
    console.log("API Response Data:", JSON.stringify(response.data, null, 2));
    
    if (response.data.data && response.data.data.length > 0) {
      console.log(`Successfully fetched ${response.data.data.length} matches.`);
    } else {
      console.log("No matches found in the response.");
    }
  } catch (error: any) {
    console.error("API Request Failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
  }
}

debugApi();
