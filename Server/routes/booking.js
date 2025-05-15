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

// Route to update booking status
router.put("/:id", (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  const sql = "UPDATE bookings SET status = ? WHERE id = ?";
  db.query(sql, [status, bookingId], (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking updated successfully" });
  });
});
// profile costumeer
router.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email query param is required" });
  }

  try {
    const sql = "SELECT id, service_id, user_email, booking_date, status FROM bookings WHERE user_email = ?";
    const [results] = await db.query(sql, [email]);
    
    console.log("Database Results:", results);  // Log the raw query results here
    
    res.status(200).json({ bookings: results });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Database error" });
  }
});






  
module.exports = router;
