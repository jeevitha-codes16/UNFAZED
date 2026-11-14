const validateClientName = (name) => {
  if (typeof name !== "string" || !name.trim()) {
    return {
      valid: false,
      message: "Client name is required.",
    };
  }

  const normalizedName = name.trim().replace(/\s+/g, " ");

  if (normalizedName.length < 2 || normalizedName.length > 60) {
    return {
      valid: false,
      message: "Client name must contain 2 to 60 characters.",
    };
  }

  const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;

  if (!namePattern.test(normalizedName)) {
    return {
      valid: false,
      message: "Client name contains invalid characters.",
    };
  }

  return {
    valid: true,
    name: normalizedName,
    message: "Client name is valid.",
  };
};

module.exports = validateClientName;