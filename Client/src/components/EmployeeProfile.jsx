import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/employee.css"; 
import guy from "../images/guy.jpg";

const EmployeeProfile = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings");
        if (Array.isArray(response.data)) {
          const filtered = response.data.filter(b => b.status === "pending");
          setPendingBookings(filtered);
        } else if (Array.isArray(response.data.bookings)) {
          const filtered = response.data.bookings.filter(b => b.status === "pending");
          setPendingBookings(filtered);
        } else {
          setError("Unexpected data format.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      }
    };

    if (user?.role === "employee") {
      fetchPendingBookings();
    }
  }, [user]);

  return (
    <div className="profile-wrapper">
      <div className="profile-content">
        <div className="profile-info">
          <h2>Employee Profile</h2>
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
          <h3>Pending Bookings</h3>
          {error && <p className="error">{error}</p>}
          {pendingBookings.length === 0 ? (
            <p>No pending bookings found.</p>
          ) : (
            <div className="scrollable-bookings">
              <table className="pending-bookings-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Service ID</th>
                    <th>User Email</th>
                    <th>Booking Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.service_id}</td>
                      <td>{booking.user_email}</td>
                      <td>{booking.booking_date}</td>
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

export default EmployeeProfile;
