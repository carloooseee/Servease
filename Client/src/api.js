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

// Booking update API (for marking as taken or not taken)
export const updateBookingStatus = (bookingId, status) =>
  API.put(`/api/bookings/${bookingId}`, { status });

// profile default
export async function fetchUserBookings(email) {
  if (!email) throw new Error("Email is required to fetch bookings.");

  try {
    const res = await fetch(`http://localhost:3000/api/bookings?email=${encodeURIComponent(email)}`);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch bookings.");
    }

    const data = await res.json();
    return data.bookings;
  } catch (err) {
    console.error("Error in fetchUserBookings:", err);
    throw err;
  }
}



export default API;
