
const topicRoutes = require("./routes/topics");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/topics", topicRoutes);

app.get("/", (req, res) => {
  res.send("Parampara backend is running!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Backend running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
