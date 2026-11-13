const validateClientEmail = (email) => {
  if (typeof email !== "string" || !email.trim()) {
    return {
      valid: false,
      message: "Client email is required.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailPattern.test(normalizedEmail)) {
    return {
      valid: false,
      message: "Please enter a valid email address.",
    };
  }

  return {
    valid: true,
    email: normalizedEmail,
    message: "Client email is valid.",
  };
};

module.exports = validateClientEmail;