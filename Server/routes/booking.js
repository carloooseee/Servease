const express = require("express");
const db = require("../db");
const router = express.Router();

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


module.exports = router;
