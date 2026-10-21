const Therapist = require("../models/Therapist");

// Get therapist profile
const getTherapistProfile = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.therapistId).select("-password");

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Therapist profile fetched successfully.",
      therapist,
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch therapist profile.",
    });
  }
};

// Update therapist profile
const updateTherapistProfile = async (req, res) => {
  try {
    const { name, specialization, bio, profileImage } = req.body;
    const updates = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Name must not be empty.",
        });
      }

      if (name.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: "Name cannot exceed 100 characters.",
        });
      }

      updates.name = name.trim();
    }

    if (specialization !== undefined) {
      if (
        typeof specialization !== "string" ||
        specialization.trim().length > 100
      ) {
        return res.status(400).json({
          success: false,
          message: "Specialization must be text up to 100 characters.",
        });
      }

      updates.specialization = specialization.trim();
    }

    if (bio !== undefined) {
      if (typeof bio !== "string" || bio.trim().length > 1000) {
        return res.status(400).json({
          success: false,
          message: "Bio must be text up to 1000 characters.",
        });
      }

      updates.bio = bio.trim();
    }

    if (profileImage !== undefined) {
      if (typeof profileImage !== "string" || profileImage.length > 2048) {
        return res.status(400).json({
          success: false,
          message: "Profile image URL must be text up to 2048 characters.",
        });
      }

      const imageUrl = profileImage.trim();

      if (imageUrl && !/^https?:\/\/\S+$/i.test(imageUrl)) {
        return res.status(400).json({
          success: false,
          message: "Profile image must use an HTTP or HTTPS URL.",
        });
      }

      updates.profileImage = imageUrl;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one profile field to update.",
      });
    }

    const therapist = await Therapist.findByIdAndUpdate(
      req.therapistId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      therapist,
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to update therapist profile.",
    });
  }
};

module.exports = {
  getTherapistProfile,
  updateTherapistProfile,
};