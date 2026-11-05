
const mongoose = require("mongoose");

const blockedTimeSchema = new mongoose.Schema(
  {
    therapist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Therapist",
      required: true,
      index: true,
    },

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
    },

    reason: {
      type: String,
      trim: true,
      default: "Unavailable",
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
  },
  {
    timestamps: true,
  }
);

blockedTimeSchema.pre("validate", function () {
  if (this.startAt && this.endAt && this.endAt <= this.startAt) {
    this.invalidate(
      "endAt",
      "End time must be later than start time."
    );
  }
});

blockedTimeSchema.index({
  therapist: 1,
  startAt: 1,
  endAt: 1,
});

module.exports = mongoose.model("BlockedTime", blockedTimeSchema);
