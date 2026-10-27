
const formatAppointmentDate = (date) => {
  const appointmentDate = new Date(date);

  if (Number.isNaN(appointmentDate.getTime())) {
    return "Invalid appointment date";
  }

  return appointmentDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const isUpcomingAppointment = (date) => {
  const appointmentDate = new Date(date);

  if (Number.isNaN(appointmentDate.getTime())) {
    return false;
  }

  return appointmentDate.getTime() > Date.now();
};

module.exports = {
  formatAppointmentDate,
  isUpcomingAppointment,
};
