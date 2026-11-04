
const express = require("express");
const cors = require("cors");

const app = express();

// Routes and middleware
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const clientRoutes = require("./routes/clientRoutes");
const authMiddleware = require("./middleware/auth");

const {
  getTherapistProfile,
  updateTherapistProfile,
} = require("./controllers/therapistController");

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("UNFAZED Backend is running!");
});

// Therapist profile routes
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

// Appointment routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/clients", clientRoutes);

module.exports = app;


