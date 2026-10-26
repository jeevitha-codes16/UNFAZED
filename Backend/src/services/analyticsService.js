// Calculate appointment statistics for the therapist dashboard
const getAppointmentAnalytics = (appointments = [], now = new Date()) => {
  if (!Array.isArray(appointments)) {
    throw new Error("Appointments must be provided as an array.");
  }

  const currentTime = new Date(now);

  if (Number.isNaN(currentTime.getTime())) {
    throw new Error("A valid current date is required.");
  }

  const analytics = {
    totalAppointments: appointments.length,
    scheduledAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    upcomingAppointments: 0,
    pastAppointments: 0,
  };

  for (const appointment of appointments) {
    if (!appointment || typeof appointment !== "object") {
      throw new Error("Every appointment must be a valid object.");
    }

    switch (appointment.status) {
      case "scheduled":
        analytics.scheduledAppointments++;
        break;

      case "completed":
        analytics.completedAppointments++;
        break;

      case "cancelled":
        analytics.cancelledAppointments++;
        break;

      default:
        throw new Error(
          `Invalid appointment status: ${appointment.status}`
        );
    }

    const appointmentDate = new Date(appointment.date);

    if (Number.isNaN(appointmentDate.getTime())) {
      throw new Error("Every appointment must have a valid date.");
    }

    if (appointment.status === "scheduled") {
      if (appointmentDate >= currentTime) {
        analytics.upcomingAppointments++;
      } else {
        analytics.pastAppointments++;
      }
    }
  }

  return analytics;
};

// Calculate the percentage of appointments completed
const getCompletionRate = (analytics) => {
  if (!analytics || typeof analytics !== "object") {
    throw new Error("Valid appointment analytics are required.");
  }

  const total = analytics.totalAppointments;
  const completed = analytics.completedAppointments;

  if (
    !Number.isFinite(total) ||
    !Number.isFinite(completed) ||
    total < 0 ||
    completed < 0 ||
    completed > total
  ) {
    throw new Error("Invalid appointment analytics values.");
  }

  if (total === 0) {
    return 0;
  }

  return Number(((completed / total) * 100).toFixed(2));
};

module.exports = {
  getAppointmentAnalytics,
  getCompletionRate,
};