const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request received:", { username, email });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    await db.query("INSERT INTO costumers (username, email, password) VALUES (?, ?, ?)", 
      [username, email, hashedPassword]);

    console.log("User registered successfully ✅");
    res.json({ message: "User registered successfully ✅" });
  } catch (error) {
    console.error("Registration failed ❌", error);
    res.status(500).json({ error: "Registration failed ❌" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received with email:", email);

  try {
    const [users] = await db.query("SELECT * FROM costumers WHERE email = ?", [email]);
    console.log("User query result:", users);

    if (users.length === 0) {
      console.log("User not found ❌");
      return res.status(401).json({ error: "User not found" });
    }

    const user = users[0];
    console.log("User found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials ❌");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("Generating token...");
    const token = jwt.sign({ id: user.id }, process.env.SESSION_SECRET, { expiresIn: "1h" });
    console.log("Generated token:", token);

    res.json({ message: "Login successful ✅", token });
  } catch (error) {
    console.error("Login failed ❌", error);
    res.status(500).json({ error: "Login failed" });
  }
});

console.log("Session Secret Key:", process.env.SESSION_SECRET); // Check if the environment variable is set

module.exports = router;
