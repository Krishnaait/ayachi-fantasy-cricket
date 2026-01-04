import axios from "axios";

const API_KEY = process.env.CRIC_API_KEY || "1a822521-d7e0-46ff-98d3-3e51020863f3";
const BASE_URL = "https://api.cricapi.com/v1";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo?: any[];
  score?: any[];
  series_id?: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

// 1. Current Matches (Top Used)
export async function getCurrentMatches() {
  try {
    const response = await api.get("/currentMatches");
    return response.data.data as Match[];
  } catch (error) {
    console.error("Error fetching current matches:", error);
    return [];
  }
}

// 2. Matches List
export async function getMatchesList(offset: number = 0) {
  try {
    const response = await api.get("/matches", { params: { offset } });
    return response.data.data as Match[];
  } catch (error) {
    console.error("Error fetching matches list:", error);
    return [];
  }
}

// 3. Series List
export async function getSeriesList(offset: number = 0) {
  try {
    const response = await api.get("/series", { params: { offset } });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching series list:", error);
    return [];
  }
}

// 4. Players List
export async function getPlayersList(offset: number = 0) {
  try {
    const response = await api.get("/players", { params: { offset } });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching players list:", error);
    return [];
  }
}

// 5. Player Info
export async function getPlayerInfo(id: string) {
  try {
    const response = await api.get("/players_info", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching player info for ${id}:`, error);
    return null;
  }
}

// 6. Match Info
export async function getMatchInfo(id: string) {
  try {
    const response = await api.get("/match_info", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching match info for ${id}:`, error);
    return null;
  }
}

// 7. Fantasy Squad (New Changes)
export async function getFantasySquad(id: string) {
  try {
    const response = await api.get("/match_squad", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching fantasy squad for ${id}:`, error);
    return null;
  }
}

// 8. Fantasy Scorecard
export async function getFantasyScorecard(id: string) {
  try {
    const response = await api.get("/match_scorecard", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching fantasy scorecard for ${id}:`, error);
    return null;
  }
}

// 9. Fantasy Match Points
export async function getFantasyMatchPoints(id: string) {
  try {
    // Note: This endpoint might vary based on the exact API version, 
    // but following the general pattern from the PDF/Image.
    const response = await api.get("/match_points", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching fantasy match points for ${id}:`, error);
    return null;
  }
}

// 10. Series Point Table
export async function getSeriesPointTable(id: string) {
  try {
    const response = await api.get("/series_points", { params: { id } });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching series point table for ${id}:`, error);
    return null;
  }
}

// 11. CricScore (Comprehensive list of all matches)
export async function getCricScore() {
  try {
    const response = await api.get("/cricScore");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cricScore:", error);
    return [];
  }
}
