const express = require("express");
const router = express.Router();
const db = require("../db"); 


router.get("/", async (req, res) => {
    try {
        const category = req.query.category;
        let query = "SELECT * FROM services";

        if (category) {
            query += " WHERE category = ?";
        }

        const [services] = category
            ? await db.query(query, [category])
            : await db.query(query);
            //Janmonique
        res.json(services);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

