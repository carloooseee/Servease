const express = require("express");
const db = require("../db");
const router = express.Router();

//register ng mga bookings
router.post("/", (req, res) => {
    const { user_email, service_id, booking_date } = req.body;

    if (!user_email || !service_id || !booking_date) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO bookings (user_email, service_id, booking_date) VALUES (?, ?, ?)";
    db.query(sql, [user_email, service_id, booking_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking successful", booking_id: result.insertId });
    });
});
// ✅ GET: Fetch only pending bookings (for promise client)
router.get("/", async (req, res) => {
    try {
        const sql = "SELECT id, service_id, user_email, booking_date, status FROM bookings WHERE status = 'pending'";
        const [results] = await db.query(sql);
        res.status(200).json({ bookings: results });
    } catch (err) {
        console.error("Error fetching pending bookings:", err);
        res.status(500).json({ error: "Database error" });
    }
});


module.exports = router;
