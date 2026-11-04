
const Availability = require("../models/Availability");

// Create therapist availability
exports.createAvailability = async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;

    if (!day || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: "Day, start time and end time are required.",
      });
    }

    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
      return res.status(400).json({
        success: false,
        message: "Time must be in HH:MM format.",
      });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be later than start time.",
      });
    }

    const availability = await Availability.create({
      therapist: req.therapistId,
      day,
      startTime,
      endTime,
    });

    res.status(201).json({
      success: true,
      message: "Availability created successfully.",
      availability,
    });
  } catch (error) {
    res.status(error.code === 11000 ? 409 : 500).json({
      success: false,
      message:
        error.code === 11000
          ? "This availability slot already exists."
          : error.message,
    });
  }
};

// Get therapist availability
exports.getAvailability = async (req, res) => {
  try {
    const availability = await Availability.find({
      therapist: req.therapistId,
    }).sort({ day: 1, startTime: 1 });

    res.status(200).json({
      success: true,
      count: availability.length,
      availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update availability
exports.updateAvailability = async (req, res) => {
  try {
    const { day, startTime, endTime, isAvailable } = req.body;

    if (startTime && endTime && startTime >= endTime) {
      return res.status(400).json({
        success: false,
        message: "End time must be later than start time.",
      });
    }

    const availability = await Availability.findOneAndUpdate(
      {
        _id: req.params.id,
        therapist: req.therapistId,
      },
      { day, startTime, endTime, isAvailable },
      { new: true, runValidators: true }
    );

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully.",
      availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete availability
exports.deleteAvailability = async (req, res) => {
  try {
    const availability = await Availability.findOneAndDelete({
      _id: req.params.id,
      therapist: req.therapistId,
    });

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

