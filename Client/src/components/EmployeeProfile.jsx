import { useEffect, useState } from "react";
import axios from "axios";
import "../css/home.css";
import "../css/profile.css";
import guy from "../images/guy.jpg";

function EmployeeProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/bookings/pending");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching pending bookings:", err);
      }
    };

    if (user?.role === "employee") {
      fetchBookings(); // Fetch bookings if the user is an employee
    }
  }, [user]);

  const handleAction = async (bookingId, action) => {
    try {
      await axios.post(`http://localhost:3001/bookings/${bookingId}/update`, { status: action });
      setBookings((prev) => prev.filter((b) => b.id !== bookingId)); // Remove updated booking from list
    } catch (err) {
      console.error("Failed to update booking:", err);
    }
  };

  if (!user) return <h1>bruh u aint exist</h1>;

  return (
    <div className="profile-info card shadow p-4 rounded text-center">
      {/* Profile Info */}
      <img src={guy} alt="Profile" className="profile-pic mb-3 rounded-circle mx-auto d-block" />
      <h2 className="mb-3">
        Welcome, <strong>{user.first_name} {user.last_name}</strong>
      </h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone Number:</strong> {user.phone_number}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {/* Pending Bookings Inside the Profile Wrapper */}
      {user.role === "employee" && (
        <div className="bookings-list mt-4 p-3">
          <h3 className="mb-3">Pending Bookings</h3>
          {bookings.length === 0 ? (
            <p>No pending bookings 💤</p>
          ) : (
            <ul className="list-group">
              {bookings.map((booking) => (
                <li key={booking.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <strong>Service ID:</strong> {booking.service_id} <br />
                    <strong>User Email:</strong> {booking.user_email} <br />
                    <strong>Date:</strong> {booking.booking_date}
                  </span>
                  <div>
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleAction(booking.id, "taken")}>✅ Accept</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleAction(booking.id, "disregarded")}>❌ Reject</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeProfile;
