
const VALID_APPOINTMENT_STATUSES = [
  "scheduled",
  "completed",
  "cancelled",
];

const isValidAppointmentStatus = (status) => {
  return (
    typeof status === "string" &&
    VALID_APPOINTMENT_STATUSES.includes(status)
  );
};

const getAppointmentStatusMessage = (status) => {
  const messages = {
    scheduled: "Your appointment is scheduled.",
    completed: "Your appointment has been completed.",
    cancelled: "Your appointment has been cancelled.",
  };

  return messages[status] || "Invalid appointment status.";
};

module.exports = {
  VALID_APPOINTMENT_STATUSES,
  isValidAppointmentStatus,
  getAppointmentStatusMessage,
};
