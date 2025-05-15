import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/profile.css";
import guy from "../images/guy.jpg"; // Replace with actual path to profile image

const Profile = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is saved in localStorage

  const prevBookings = useRef(); // To track previous bookings and prevent unnecessary logs

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings", {
          params: { email: user.email }
        });


        // Make sure we are receiving an array
        if (Array.isArray(response.data.bookings)) {
          // Filter bookings by user_email matching the logged-in user's email
          const filteredBookings = response.data.bookings.filter(booking =>
            booking.user_email === user.email
          );

          // Check if the filteredBookings are different from the previous bookings
          if (JSON.stringify(prevBookings.current) !== JSON.stringify(filteredBookings)) {
            console.log("Filtered Bookings: ", filteredBookings); // Log only if the bookings have changed
            prevBookings.current = filteredBookings; // Update the ref
          }

          setUserBookings(filteredBookings); // Update state with filtered bookings
        } else {
          setError("Bookings data is not an array."); // Handle the case where it's not an array
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      }
    };

    if (user?.email) {
      fetchUserBookings(); // Call the function if user exists
    }
  }, [user]); // Depend on user to re-fetch bookings if the user changes

  return (
    <div className="profile-wrapper">
      <div className="profile-content">

        <div className="profile-info">
        <h2>Welcome, {user.first_name}!</h2>
          <img
            src={guy}
            alt="Profile"
            className="profile-pic mb-3 rounded-circle mx-auto d-block"
          />
          <div className="profile-container">
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.phone_number}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>

        <div className="bookings-section">
          <h3>Bookings you've Made</h3>
          {error && <p className="error">{error}</p>}
          {userBookings.length === 0 ? (
            <p>No pending bookings found for this user.</p>
          ) : (
            <div className="scrollable-bookings">
              <table className="user-bookings-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service ID</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.service_id}</td>
                      <td>{booking.booking_date}</td>
                      <td>{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
