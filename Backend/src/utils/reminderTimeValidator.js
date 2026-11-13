const validateReminderTime = (appointmentDate, reminderMinutes) => {
  const appointment = new Date(appointmentDate);

  if (Number.isNaN(appointment.getTime())) {
    return {
      valid: false,
      message: "Invalid appointment date.",
    };
  }

  if (
    !Number.isInteger(reminderMinutes) ||
    reminderMinutes <= 0 ||
    reminderMinutes > 10080
  ) {
    return {
      valid: false,
      message: "Reminder must be between 1 and 10080 minutes.",
    };
  }

  const reminderDate = new Date(
    appointment.getTime() - reminderMinutes * 60 * 1000
  );

  if (reminderDate <= new Date()) {
    return {
      valid: false,
      message: "Reminder time must be in the future.",
    };
  }

  return {
    valid: true,
    reminderAt: reminderDate,
    message: "Reminder time is valid.",
  };
};

module.exports = validateReminderTime;