import { useState, useEffect } from "react";
import { getServices } from "../api"; // ✅ Import API call
import "../css/services.css";

const Services = () => {
    const [services, setServices] = useState([]);
    const [category, setCategory] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [bookingDate, setBookingDate] = useState("");

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await getServices(category); // ✅ Use category filter
                console.log("Fetched services:", res.data); // ✅ Debugging
                setServices(res.data);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchServices();
    }, [category]); // ✅ Fetches when `category` changes

    const handleBooking = async () => {
        if (!selectedService || !bookingDate) return alert("Select a service and date.");
        try {
            const response = await fetch("http://localhost:3000/api/bookings", { // ✅ Ensure correct API endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ service_id: selectedService.id, user_id: 1, booking_date: bookingDate }) 
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error booking service:", error);
        }
    };

    return (
        <div className="services-container">
            <h2>Book a Service</h2>
    
            <div className="filter-container">
                <label>Filter by Category:</label>
                <select onChange={e => setCategory(e.target.value)}>
                    <option value="">All</option>
                    <option value="house cleaning">House Cleaning</option>
                    <option value="car cleaning">Car Cleaning</option>
                    <option value="IT support">IT Support</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical repairs">Electrical Repairs</option>
                </select>
            </div>

    
            <ul className="services-list">
                {services.map(service => (
                    <li key={service.id} onClick={() => setSelectedService(service)}>
                        {service.name} <br/> ₱{service.price}
                    </li>
                ))}
            </ul>
    
            {selectedService && (
                <div className="booking-container">
                    <h3>Booking for {selectedService.name}</h3>
                    <input type="datetime-local" onChange={e => setBookingDate(e.target.value)} />
                    <button onClick={handleBooking}>Book Now</button>
                </div>
            )}
        </div>
    );
    
};

export default Services;
