const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const validateWorkingHours = (workingHours) => {
  if (!Array.isArray(workingHours) || workingHours.length === 0) {
    return {
      valid: false,
      message: "Working hours must contain at least one day.",
    };
  }

  const usedDays = new Set();

  for (const slot of workingHours) {
    if (!DAYS.includes(slot.day)) {
      return {
        valid: false,
        message: "Invalid working day.",
      };
    }

    if (usedDays.has(slot.day)) {
      return {
        valid: false,
        message: `Working hours already exist for ${slot.day}.`,
      };
    }

    usedDays.add(slot.day);

    const result = require("./timeSlotValidator")(
      slot.startTime,
      slot.endTime
    );

    if (!result.valid) {
      return result;
    }
  }

  return {
    valid: true,
    message: "Working hours are valid.",
  };
};

module.exports = validateWorkingHours;