const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("UNFAZED Backend is running!");
});

app.get("/api/therapist/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Authenticated therapist access granted!",
    therapistId: req.therapistId,
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

module.exports = app;