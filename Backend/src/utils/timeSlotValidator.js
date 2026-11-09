const validateTimeSlot = (startTime, endTime) => {
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if (!timePattern.test(startTime) || !timePattern.test(endTime)) {
    return {
      valid: false,
      message: "Time must be in HH:MM format.",
    };
  }

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  if (end <= start) {
    return {
      valid: false,
      message: "End time must be later than start time.",
    };
  }

  return {
    valid: true,
    message: "Time slot is valid.",
  };
};

module.exports = validateTimeSlot;