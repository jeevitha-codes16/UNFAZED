const Therapist = require("../models/Therapist");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

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
        return {
          duplicate: true,
        };
      }

      return bcrypt.hash(password, 12);
    })
    .then((result) => {
     if (result && result.duplicate) {
  res.status(409).json({
    success: false,
    message: "An account with this email already exists.",
  });

  return null;
}

      return Therapist.create({
        name: name.trim(),
        email: normalizedEmail,
        password: result,
        specialization: specialization || "",
      });
    })
    .then((therapist) => {
      if (!therapist || therapist.headersSent) {
        return;
      }

      const token = jwt.sign(
        {
          id: therapist._id,
          role: "therapist",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
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
      console.error("Therapist registration error:", error.message);

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

module.exports = { registerTherapist };