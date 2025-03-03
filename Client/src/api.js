import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // Allows cookies/session
});

export const loginUser = (userData) => API.post("/auth/login", userData);
export const registerUser = (userData) => API.post("/auth/register", userData);
export const getProfile = () => API.get("/auth/profile");

export default API;
