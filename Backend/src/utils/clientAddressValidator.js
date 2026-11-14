const validateClientAddress = (address) => {
  if (typeof address !== "string" || !address.trim()) {
    return {
      valid: false,
      message: "Client address is required.",
    };
  }

  const normalizedAddress = address.trim().replace(/\s+/g, " ");

  if (normalizedAddress.length < 5 || normalizedAddress.length > 200) {
    return {
      valid: false,
      message: "Address must contain 5 to 200 characters.",
    };
  }

  return {
    valid: true,
    address: normalizedAddress,
    message: "Client address is valid.",
  };
};

module.exports = validateClientAddress;