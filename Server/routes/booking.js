const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
    const { user_id, service_id, date, time } = req.body;
    if (!user_id || !service_id || !date || !time) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = "INSERT INTO bookings (user_id, service_id, date, time) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_id, service_id, date, time], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Booking successful", booking_id: result.insertId });
    });
});

module.exports = router;
