const validatePhoneNumber = (phone) => {
  if (phone === undefined || phone === null || phone.trim() === "") {
    return {
      valid: true,
      phone: "",
      message: "Phone number is optional.",
    };
  }

  if (typeof phone !== "string") {
    return {
      valid: false,
      message: "Phone number must be text.",
    };
  }

  const normalizedPhone = phone.replace(/[\s()-]/g, "");

  const phonePattern = /^\+?[1-9]\d{7,14}$/;

  if (!phonePattern.test(normalizedPhone)) {
    return {
      valid: false,
      message: "Please enter a valid phone number.",
    };
  }

  return {
    valid: true,
    phone: normalizedPhone,
    message: "Phone number is valid.",
  };
};

module.exports = validatePhoneNumber;
