import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function test() {
  console.log("Testing CricAPI with key:", API_KEY);
  
  const endpoints = [
    "/currentMatches",
    "/matches",
    "/series",
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n--- Testing ${endpoint} ---`);
      const res = await axios.get(`${BASE_URL}${endpoint}`, {
        params: { apikey: API_KEY, offset: 0 }
      });
      
      console.log(`Status: ${res.status}`);
      if (res.data && res.data.data) {
        const data = res.data.data;
        console.log(`Count: ${data.length}`);
        
        if (data.length > 0) {
          console.log("First Item Sample:", JSON.stringify(data[0], null, 2));
          
          // Check for statuses
          const statuses = new Set(data.map((m: any) => m.status));
          console.log("Available Statuses:", Array.from(statuses));
          
          const matchStarted = data.filter((m: any) => m.matchStarted).length;
          const matchEnded = data.filter((m: any) => m.matchEnded).length;
          console.log(`Match Started: ${matchStarted}, Match Ended: ${matchEnded}`);
        }
      } else {
        console.log("No data field in response:", res.data);
      }
    } catch (error: any) {
      console.error(`Error testing ${endpoint}:`, error.message);
    }
  }
}

test();
