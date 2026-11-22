
const validateConsent = (consent) => {
  const errors = [];

  if (
    !consent ||
    typeof consent !== "object" ||
    Array.isArray(consent)
  ) {
    return {
      isValid: false,
      errors: ["Invalid consent information."],
    };
  }

  if (typeof consent.accepted !== "boolean") {
    errors.push("Consent decision must be true or false.");
  }

  if (
    typeof consent.policyVersion !== "string" ||
    !consent.policyVersion.trim()
  ) {
    errors.push("Policy version is required.");
  } else if (consent.policyVersion.trim().length > 30) {
    errors.push("Policy version cannot exceed 30 characters.");
  }

  if (
    consent.consentType !== undefined &&
    !["treatment", "privacy", "terms"].includes(consent.consentType)
  ) {
    errors.push("Invalid consent type.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = { validateConsent };
