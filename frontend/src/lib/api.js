import axios from "axios";

// Centralized Axios instance used by the Day 2 / Day 3 pages.
// Existing Day 1 files keep using their own axios.get("http://localhost:5000/...")
// calls untouched, so nothing existing is disturbed.
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
