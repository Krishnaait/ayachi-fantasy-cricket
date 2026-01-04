import axios from "axios";

const API_KEY = "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

async function findUpcoming() {
  console.log("Searching for upcoming matches...");
  let offset = 0;
  let found = 0;
  
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`Fetching matches with offset ${offset}...`);
      const res = await axios.get(`${BASE_URL}/matches`, {
        params: { apikey: API_KEY, offset }
      });
      
      const data = res.data.data;
      if (!data || data.length === 0) break;
      
      const upcoming = data.filter((m: any) => !m.matchStarted);
      if (upcoming.length > 0) {
        console.log(`Found ${upcoming.length} upcoming matches on this page!`);
        upcoming.forEach((m: any) => {
          console.log(`- [${m.date}] ${m.name} (ID: ${m.id})`);
        });
        found += upcoming.length;
      }
      
      offset += 25;
    } catch (error: any) {
      console.error("Error:", error.message);
      break;
    }
  }
  
  console.log(`\nTotal upcoming matches found: ${found}`);
}

findUpcoming();
