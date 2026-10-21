
const express = require("express");
const Topic = require("../models/Topic");

const router = express.Router();

// Get all heritage topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find().sort({ createdAt: 1 });
    res.json(topics);
  } catch (error) {
    console.error("Error fetching topics:", error.message);
    res.status(500).json({ message: "Failed to fetch topics" });
  }
});

// Get one heritage topic by its ID
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    res.json(topic);
  } catch (error) {
    res.status(400).json({ message: "Invalid topic ID" });
  }
});

module.exports = router;
