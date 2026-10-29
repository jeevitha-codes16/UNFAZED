
const validateTherapistProfile = (profile) => {
  const errors = [];

  if (
    typeof profile.name !== "string" ||
    !profile.name.trim()
  ) {
    errors.push("Therapist name is required.");
  } else if (profile.name.trim().length > 100) {
    errors.push("Therapist name cannot exceed 100 characters.");
  }

  if (
    typeof profile.specialization !== "string" ||
    profile.specialization.length > 100
  ) {
    errors.push("Specialization must be a string of up to 100 characters.");
  }

  if (
    typeof profile.bio !== "string" ||
    profile.bio.length > 1000
  ) {
    errors.push("Bio must be a string of up to 1000 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateTherapistProfile };
