const Therapist = require("../models/Therapist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Register a new therapist
const registerTherapist = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { name, email, password, specialization } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  Therapist.findOne({ email: normalizedEmail })
    .then((existingTherapist) => {
      if (existingTherapist) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      return bcrypt.hash(password, 12).then((hashedPassword) => {
        return Therapist.create({
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          specialization: specialization || "",
        });
      });
    })
    .then((therapist) => {
      if (!therapist) return;

      const token = jwt.sign(
        { id: therapist._id, role: "therapist" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(201).json({
        success: true,
        message: "Therapist registered successfully.",
        token,
        therapist: {
          id: therapist._id,
          name: therapist.name,
          email: therapist.email,
          specialization: therapist.specialization,
        },
      });
    })
    .catch((error) => {
      console.error("Registration error:", error.message);

      if (res.headersSent) return;

      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "An account with this email already exists.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Unable to register therapist.",
      });
    });
};

// Log in an existing therapist
const loginTherapist = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  Therapist.findOne({ email: normalizedEmail })
    .then((therapist) => {
      if (!therapist) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      return bcrypt.compare(password, therapist.password).then((matches) => {
        if (!matches) {
          return res.status(401).json({
            success: false,
            message: "Invalid email or password.",
          });
        }

        const token = jwt.sign(
          { id: therapist._id, role: "therapist" },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          success: true,
          message: "Login successful.",
          token,
          therapist: {
            id: therapist._id,
            name: therapist.name,
            email: therapist.email,
            specialization: therapist.specialization,
          },
        });
      });
    })
    .catch((error) => {
      console.error("Login error:", error.message);

      if (res.headersSent) return;

      return res.status(500).json({
        success: false,
        message: "Unable to log in.",
      });
    });
};

module.exports = {
  registerTherapist,
  loginTherapist,
};