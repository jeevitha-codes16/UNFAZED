const express = require("express");
const { body } = require("express-validator");

const {
  registerTherapist,
  loginTherapist,
} = require("../controllers/authController");

const router = express.Router();

// Therapist Registration API
router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required."),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain at least 8 characters."),

    body("specialization")
      .optional()
      .trim(),
  ],
  registerTherapist
);

// Therapist Login API
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required."),
  ],
  loginTherapist
);

module.exports = router;