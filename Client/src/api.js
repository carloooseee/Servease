import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Allows cookies/session
});

// Authentication APIs
export const loginUser = (userData) => API.post("/auth/login", userData);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const getProfile = () => API.get("/auth/profile");

// Services API (fetching services)
export const getServices = (category = "") =>
  API.get(`/api/services${category ? `?category=${category}` : ""}`);


export default API;
