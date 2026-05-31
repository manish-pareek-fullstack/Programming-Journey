/**
 * cricketApi.js
 * API service with smart caching and mock data fallback.
 * Set VITE_CRICKET_API_KEY in .env to use live data from cricapi.com
 */

const API_KEY = import.meta.env.VITE_CRICKET_API_KEY || "";
const BASE_URL = "https://api.cricapi.com/v1";

// ── In-memory cache ──────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 60_000; // 1 minute

const getCached = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
};
const setCached = (key, data) => cache.set(key, { data, ts: Date.now() });

// ── Helpers ──────────────────────────────────────────────────
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const apiFetch = async (endpoint) => {
  const url = `${BASE_URL}/${endpoint}?apikey=${API_KEY}&offset=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  return res.json();
};

// ── Mock Data ────────────────────────────────────────────────
const MOCK_LIVE = [
  {
    id: "l1",
    name: "India vs Australia",
    matchType: "T20I",
    status: "live",
    isLive: true,
    venue: "Wankhede Stadium, Mumbai",
    teams: ["India", "Australia"],
    teamInfo: [
      { name: "India", shortname: "IND" },
      { name: "Australia", shortname: "AUS" },
    ],
    score: [
      { r: 187, w: 4, o: "18.3", inning: "India" },
      { r: 156, w: 7, o: "20.0", inning: "Australia" },
    ],
    dateTimeGMT: new Date().toISOString(),
  },
  {
    id: "l2",
    name: "England vs Pakistan",
    matchType: "Test",
    status: "live",
    isLive: true,
    venue: "Lord's Cricket Ground, London",
    teams: ["England", "Pakistan"],
    teamInfo: [
      { name: "England", shortname: "ENG" },
      { name: "Pakistan", shortname: "PAK" },
    ],
    score: [{ r: 342, w: 8, o: "95.2", inning: "England" }],
    dateTimeGMT: new Date().toISOString(),
  },
  {
    id: "l3",
    name: "South Africa vs New Zealand",
    matchType: "ODI",
    status: "live",
    isLive: true,
    venue: "Newlands, Cape Town",
    teams: ["South Africa", "New Zealand"],
    teamInfo: [
      { name: "South Africa", shortname: "SA" },
      { name: "New Zealand", shortname: "NZ" },
    ],
    score: [
      { r: 278, w: 10, o: "50.0", inning: "NZ" },
      { r: 214, w: 6, o: "42.0", inning: "SA" },
    ],
    dateTimeGMT: new Date().toISOString(),
  },
];

const MOCK_FIXTURES = [
  {
    id: "f1",
    name: "India vs West Indies",
    matchType: "T20I",
    isLive: false,
    venue: "Eden Gardens, Kolkata",
    teams: ["India", "West Indies"],
    teamInfo: [
      { name: "India", shortname: "IND" },
      { name: "West Indies", shortname: "WI" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 2 * 86400000).toISOString(),
  },
  {
    id: "f2",
    name: "Sri Lanka vs Bangladesh",
    matchType: "ODI",
    isLive: false,
    venue: "SSC, Colombo",
    teams: ["Sri Lanka", "Bangladesh"],
    teamInfo: [
      { name: "Sri Lanka", shortname: "SL" },
      { name: "Bangladesh", shortname: "BAN" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 3 * 86400000).toISOString(),
  },
  {
    id: "f3",
    name: "Pakistan vs Afghanistan",
    matchType: "T20I",
    isLive: false,
    venue: "Gaddafi Stadium, Lahore",
    teams: ["Pakistan", "Afghanistan"],
    teamInfo: [
      { name: "Pakistan", shortname: "PAK" },
      { name: "Afghanistan", shortname: "AFG" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 5 * 86400000).toISOString(),
  },
  {
    id: "f4",
    name: "Australia vs England",
    matchType: "Test",
    isLive: false,
    venue: "MCG, Melbourne",
    teams: ["Australia", "England"],
    teamInfo: [
      { name: "Australia", shortname: "AUS" },
      { name: "England", shortname: "ENG" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 7 * 86400000).toISOString(),
  },
  {
    id: "f5",
    name: "South Africa vs Zimbabwe",
    matchType: "ODI",
    isLive: false,
    venue: "Supersport Park, Centurion",
    teams: ["South Africa", "Zimbabwe"],
    teamInfo: [
      { name: "South Africa", shortname: "SA" },
      { name: "Zimbabwe", shortname: "ZIM" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 10 * 86400000).toISOString(),
  },
  {
    id: "f6",
    name: "New Zealand vs Bangladesh",
    matchType: "T20I",
    isLive: false,
    venue: "Eden Park, Auckland",
    teams: ["New Zealand", "Bangladesh"],
    teamInfo: [
      { name: "New Zealand", shortname: "NZ" },
      { name: "Bangladesh", shortname: "BAN" },
    ],
    score: [],
    dateTimeGMT: new Date(Date.now() + 12 * 86400000).toISOString(),
  },
];

const MOCK_TEAMS = [
  {
    id: "t1",
    name: "India",
    shortname: "IND",
    rank: 1,
    flag: "🇮🇳",
    color: "#ff9933",
    m: 512,
    w: 318,
    captain: "Rohit Sharma",
    coach: "Gautam Gambhir",
  },
  {
    id: "t2",
    name: "Australia",
    shortname: "AUS",
    rank: 2,
    flag: "🇦🇺",
    color: "#f5c518",
    m: 491,
    w: 294,
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
  },
  {
    id: "t3",
    name: "England",
    shortname: "ENG",
    rank: 3,
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    color: "#003f88",
    m: 478,
    w: 271,
    captain: "Ben Stokes",
    coach: "Brendon McCullum",
  },
  {
    id: "t4",
    name: "Pakistan",
    shortname: "PAK",
    rank: 4,
    flag: "🇵🇰",
    color: "#00a550",
    m: 455,
    w: 256,
    captain: "Babar Azam",
    coach: "Gary Kirsten",
  },
  {
    id: "t5",
    name: "South Africa",
    shortname: "SA",
    rank: 5,
    flag: "🇿🇦",
    color: "#007a4d",
    m: 443,
    w: 248,
    captain: "Temba Bavuma",
    coach: "Shukri Conrad",
  },
  {
    id: "t6",
    name: "New Zealand",
    shortname: "NZ",
    rank: 6,
    flag: "🇳🇿",
    color: "#000000",
    m: 412,
    w: 223,
    captain: "Tom Latham",
    coach: "Gary Stead",
  },
  {
    id: "t7",
    name: "Sri Lanka",
    shortname: "SL",
    rank: 7,
    flag: "🇱🇰",
    color: "#8b0000",
    m: 398,
    w: 198,
    captain: "Dimuth Karunaratne",
    coach: "Sanath Jayasuriya",
  },
  {
    id: "t8",
    name: "West Indies",
    shortname: "WI",
    rank: 8,
    flag: "🏝️",
    color: "#7b0041",
    m: 387,
    w: 185,
    captain: "Shai Hope",
    coach: "Daren Sammy",
  },
  {
    id: "t9",
    name: "Bangladesh",
    shortname: "BAN",
    rank: 9,
    flag: "🇧🇩",
    color: "#006a4e",
    m: 356,
    w: 156,
    captain: "Najmul Hossain Shanto",
    coach: "Chandika Hathurusingha",
  },
  {
    id: "t10",
    name: "Afghanistan",
    shortname: "AFG",
    rank: 10,
    flag: "🇦🇫",
    color: "#000080",
    m: 289,
    w: 134,
    captain: "Hashmatullah Shahidi",
    coach: "Jonathan Trott",
  },
  {
    id: "t11",
    name: "Zimbabwe",
    shortname: "ZIM",
    rank: 11,
    flag: "🇿🇼",
    color: "#006400",
    m: 267,
    w: 98,
    captain: "Craig Ervine",
    coach: "Justin Sammons",
  },
  {
    id: "t12",
    name: "Ireland",
    shortname: "IRE",
    rank: 12,
    flag: "🇮🇪",
    color: "#169b62",
    m: 198,
    w: 87,
    captain: "Paul Stirling",
    coach: "Heinrich Malan",
  },
];

// ── Public API ───────────────────────────────────────────────
export const getLiveMatches = async () => {
  const key = "live";
  const hit = getCached(key);
  if (hit) return hit;
  if (!API_KEY) {
    await wait(900);
    setCached(key, MOCK_LIVE);
    return MOCK_LIVE;
  }
  try {
    const d = await apiFetch("currentMatches");
    const res = (d.data || []).filter((m) => m.matchStarted && !m.matchEnded);
    setCached(key, res);
    return res;
  } catch {
    setCached(key, MOCK_LIVE);
    return MOCK_LIVE;
  }
};

export const getFixtures = async () => {
  const key = "fixtures";
  const hit = getCached(key);
  if (hit) return hit;
  if (!API_KEY) {
    await wait(800);
    setCached(key, MOCK_FIXTURES);
    return MOCK_FIXTURES;
  }
  try {
    const d = await apiFetch("matches");
    const res = (d.data || []).filter((m) => !m.matchStarted);
    setCached(key, res);
    return res;
  } catch {
    setCached(key, MOCK_FIXTURES);
    return MOCK_FIXTURES;
  }
};

export const getTeams = async () => {
  const key = "teams";
  const hit = getCached(key);
  if (hit) return hit;
  await wait(600);
  setCached(key, MOCK_TEAMS);
  return MOCK_TEAMS;
};

export const searchAll = async (q) => {
  await wait(300);
  const ql = q.toLowerCase();
  return {
    matches: [...MOCK_LIVE, ...MOCK_FIXTURES].filter(
      (m) =>
        m.name.toLowerCase().includes(ql) ||
        m.venue.toLowerCase().includes(ql) ||
        m.matchType.toLowerCase().includes(ql) ||
        m.teams.some((t) => t.toLowerCase().includes(ql)),
    ),
    teams: MOCK_TEAMS.filter(
      (t) =>
        t.name.toLowerCase().includes(ql) ||
        t.shortname.toLowerCase().includes(ql) ||
        t.captain.toLowerCase().includes(ql),
    ),
  };
};
