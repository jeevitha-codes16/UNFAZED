
const Appointment = require("../models/Appointment");

// Create appointment
const createAppointment = async (req, res) => {
  try {
    const { clientName, clientEmail, date, duration, reason } = req.body;

    if (!clientName?.trim() || !clientEmail?.trim() || !date) {
      return res.status(400).json({
        success: false,
        message: "Client name, email and appointment date are required.",
      });
    }

    const appointmentDate = new Date(date);
    const appointmentDuration = duration === undefined ? 60 : Number(duration);

    if (Number.isNaN(appointmentDate.getTime()) ||
        appointmentDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Choose a valid future appointment date.",
      });
    }

    if (!Number.isFinite(appointmentDuration) ||
        appointmentDuration < 15 ||
        appointmentDuration > 240) {
      return res.status(400).json({
        success: false,
        message: "Duration must be between 15 and 240 minutes.",
      });
    }

    const email = clientEmail.trim().toLowerCase();
    const endTime = new Date(
      appointmentDate.getTime() + appointmentDuration * 60000
    );

    const existingAppointments = await Appointment.find({
      therapist: req.therapistId,
      status: "scheduled",
      date: {
        $lt: endTime,
        $gte: new Date(appointmentDate.getTime() - 240 * 60000),
      },
    });

    const conflict = existingAppointments.some((appointment) => {
      const existingEnd = new Date(
        appointment.date.getTime() + appointment.duration * 60000
      );

      return appointmentDate < existingEnd && endTime > appointment.date;
    });

    if (conflict) {
      return res.status(409).json({
        success: false,
        message: "This appointment overlaps an existing appointment.",
      });
    }

    const appointment = await Appointment.create({
      therapist: req.therapistId,
      clientName: clientName.trim(),
      clientEmail: email,
      date: appointmentDate,
      duration: appointmentDuration,
      reason: typeof reason === "string" ? reason.trim() : "",
    });

    return res.status(201).json({
      success: true,
      message: "Appointment created successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to create appointment.",
    });
  }
};

// Get therapist appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      therapist: req.therapistId,
    }).sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch appointments.",
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["scheduled", "completed", "cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be scheduled, completed or cancelled.",
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: req.params.id,
        therapist: req.therapistId,
      },
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment status updated successfully.",
      appointment,
    });
  } catch (error) {
    console.error("Update appointment error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to update appointment.",
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
};
