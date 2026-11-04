
const express = require("express");
const authMiddleware = require("../middleware/auth");

const {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} = require("../controllers/availabilityController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createAvailability);
router.get("/", getAvailability);
router.put("/:id", updateAvailability);
router.delete("/:id", deleteAvailability);

module.exports = router;
