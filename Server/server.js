require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/services"); 
const bookingRoutes = require("./routes/booking"); 

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = ['http://localhost:5173']; // You can add more origins if needed
app.use(cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
  })
);

// Serve React frontend
app.use(express.static(path.join(__dirname, "../Client")));

// API Routes
app.use("/auth", authRoutes); 
app.use("/api/services", serviceRoutes); 
app.use("/api/bookings", bookingRoutes); 

// Serve React for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} 🚀`));
