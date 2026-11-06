
const BlockedTime = require("../models/BlockedTime");

// Create blocked time
exports.createBlockedTime = async (req, res) => {
  try {
    const { startAt, endAt, reason, timezone } = req.body;

    if (!startAt || !endAt) {
      return res.status(400).json({
        success: false,
        message: "Start date and end date are required.",
      });
    }

    const start = new Date(startAt);
    const end = new Date(endAt);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end <= start
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid start and end dates.",
      });
    }

    const overlap = await BlockedTime.findOne({
      therapist: req.therapistId,
      startAt: { $lt: end },
      endAt: { $gt: start },
    });

    if (overlap) {
      return res.status(409).json({
        success: false,
        message: "This time overlaps an existing blocked period.",
      });
    }

    const blockedTime = await BlockedTime.create({
      therapist: req.therapistId,
      startAt: start,
      endAt: end,
      reason,
      timezone,
    });

    res.status(201).json({
      success: true,
      message: "Blocked time created successfully.",
      blockedTime,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all blocked times
exports.getBlockedTimes = async (req, res) => {
  try {
    const blockedTimes = await BlockedTime.find({
      therapist: req.therapistId,
    }).sort({ startAt: 1 });

    res.status(200).json({
      success: true,
      count: blockedTimes.length,
      blockedTimes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete blocked time
exports.deleteBlockedTime = async (req, res) => {
  try {
    const blockedTime = await BlockedTime.findOneAndDelete({
      _id: req.params.id,
      therapist: req.therapistId,
    });

    if (!blockedTime) {
      return res.status(404).json({
        success: false,
        message: "Blocked time not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blocked time deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
