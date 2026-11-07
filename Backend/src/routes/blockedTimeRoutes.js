
const express = require("express");
const authMiddleware = require("../middleware/auth");

const {
  createBlockedTime,
  getBlockedTimes,
  deleteBlockedTime,
} = require("../controllers/blockedTimeController");

const router = express.Router();

// Protect all blocked-time routes
router.use(authMiddleware);

// Create blocked time
router.post("/", createBlockedTime);

// Get all blocked times
router.get("/", getBlockedTimes);

// Delete blocked time
router.delete("/:id", deleteBlockedTime);

module.exports = router;
