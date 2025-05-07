import { useState, useEffect } from "react";
import { getServices } from "../api";
import "../css/services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices(category);
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [category]);

  const handleBooking = async () => {
    if (!selectedServiceId || !bookingDate) {
      return alert("Select a service and date.");
    }

    if (user) {
      const selectedService = services.find(service => service.id === parseInt(selectedServiceId));
      try {
        await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: selectedService.id,
            user_email: user.email,
            booking_date: bookingDate
          })
        });
        alert("Successful Booking.");
      } catch (error) {
        console.error("Error booking service:", error);
      }
    } else {
      return alert("No user logged in.");
    }
  };

  return (
    <div className="service">
    <div className="services-container">
      <h2>Book a Service</h2>

      <div className="dropdown-container">
        <label htmlFor="category">Filter by Category:</label>
        <select id="category" onChange={e => setCategory(e.target.value)}>
          <option value="">All</option>
          <option value="house cleaning">House Cleaning</option>
          <option value="car cleaning">Car Cleaning</option>
          <option value="IT support">IT Support</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical repairs">Electrical Repairs</option>
        </select>
        <label htmlFor="services">Select a Service:</label>
        <select id="services" onChange={e => setSelectedServiceId(e.target.value)}>
          <option value="">Choose</option>
          {services.map(service => (
            <option key={service.id} value={service.id}>
              {service.name} — ₱{service.price}
            </option>
          ))}
        </select>
      </div>
      {selectedServiceId && (
        <div className="booking-container">
          <label htmlFor="Date">Select a Date:</label>
          <input type="datetime-local" onChange={e => setBookingDate(e.target.value)} />
          <button onClick={handleBooking}>Book Now</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Services;
