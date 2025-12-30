import axios from "axios";

const API_KEY = process.env.CRIC_API_KEY || "your_api_key_here";
const BASE_URL = "https://api.cricketdata.org/v1";

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  score?: any[];
  series_id?: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}

export async function getMatches() {
  try {
    const response = await axios.get(`${BASE_URL}/matches`, {
      params: { apikey: API_KEY, offset: 0 }
    });
    return response.data.data as Match[];
  } catch (error) {
    console.error("Error fetching matches:", error);
    return [];
  }
}

export async function getSquad(matchId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/match_squad`, {
      params: { apikey: API_KEY, id: matchId }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching squad for match ${matchId}:`, error);
    return null;
  }
}

export async function getScorecard(matchId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/match_scorecard`, {
      params: { apikey: API_KEY, id: matchId }
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching scorecard for match ${matchId}:`, error);
    return null;
  }
}
