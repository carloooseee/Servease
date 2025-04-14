const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  console.log("Received data:", req.body); // Debug log
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
  }
  try {
      
      const sql = "INSERT INTO users (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)";

      db.query(sql, [firstName, lastName, email, phone, password], (err, result) => {
          if (err) {
              return res.status(500).json({ message: "Database error", error: err.message });
          }
          res.json({ message: "Registration successful! ✅" });
      });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Login User (Without bcrypt)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received with email:", email);

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log("User query result:", users);

    if (users.length === 0) {
      console.log("User not found ❌");
      return res.status(401).json({ error: "User not found" });
    }

    const user = users[0];
    console.log("User found:", user);

    if (password !== user.password) {
      console.log("Invalid credentials ❌");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ✅ Send back user info (excluding password)
    res.json({
      message: "Login successful ✅",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number
      }
    });
  } catch (error) {
    console.error("Login failed ❌", error);
    res.status(500).json({ error: "Login failed" });
  }
});


console.log("Session Secret Key:", process.env.SESSION_SECRET); 

module.exports = router;
