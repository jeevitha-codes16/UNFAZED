const getUpcomingAppointments = (
  appointments = [],
  now = new Date(),
  windowHours = 24
) => {
  if (!Array.isArray(appointments)) {
    throw new Error("Appointments must be an array.");
  }

  const currentTime = new Date(now);

  if (Number.isNaN(currentTime.getTime())) {
    throw new Error("A valid current date is required.");
  }

  if (!Number.isFinite(windowHours) || windowHours <= 0) {
    throw new Error("Reminder window must be greater than zero.");
  }

  const windowEnd = new Date(
    currentTime.getTime() + windowHours * 60 * 60 * 1000
  );

  return appointments.filter((appointment) => {
    if (!appointment || appointment.status !== "scheduled") {
      return false;
    }

    const appointmentDate = new Date(appointment.date);

    return (
      !Number.isNaN(appointmentDate.getTime()) &&
      appointmentDate > currentTime &&
      appointmentDate <= windowEnd
    );
  });
};

const createReminderMessage = (appointment) => {
  if (!appointment || !appointment.clientName || !appointment.date) {
    throw new Error("Appointment details are incomplete.");
  }

  const appointmentDate = new Date(appointment.date);

  if (Number.isNaN(appointmentDate.getTime())) {
    throw new Error("Invalid appointment date.");
  }

  const formattedDate = appointmentDate.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return {
    recipient: appointment.clientEmail,
    subject: "Upcoming therapy appointment",
    message: `Hello ${appointment.clientName}, this is a reminder of your upcoming appointment on ${formattedDate}. Please contact your therapist if you need to reschedule.`,
  };
};

module.exports = {
  getUpcomingAppointments,
  createReminderMessage,
};