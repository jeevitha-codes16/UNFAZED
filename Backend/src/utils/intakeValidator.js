
const validateClientIntake = (intake) => {
  const errors = [];

  if (
    typeof intake.clientName !== "string" ||
    !intake.clientName.trim()
  ) {
    errors.push("Client name is required.");
  }

  if (
    typeof intake.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(intake.email)
  ) {
    errors.push("Please enter a valid email address.");
  }

  if (
    typeof intake.reasonForVisit !== "string" ||
    !intake.reasonForVisit.trim()
  ) {
    errors.push("Reason for visit is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateClientIntake };
