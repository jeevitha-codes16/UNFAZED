const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("UNFAZED Backend is running!");
});

// Authentication routes
app.use("/api/auth", authRoutes);

module.exports = app;