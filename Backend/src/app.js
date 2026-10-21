const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/auth");
const {
  getTherapistProfile,
  updateTherapistProfile,
} = require("./controllers/therapistController");
const app = express();

app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("UNFAZED Backend is running!");
});

app.get(
  "/api/therapist/profile",
  authMiddleware,
  getTherapistProfile
);

app.put(
  "/api/therapist/profile",
  authMiddleware,
  updateTherapistProfile
);

// Authentication routes
app.use("/api/auth", authRoutes);

module.exports = app;