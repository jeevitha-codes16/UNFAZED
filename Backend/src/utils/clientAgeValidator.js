const validateClientAge = (age) => {
  if (age === undefined || age === null || age === "") {
    return {
      valid: false,
      message: "Client age is required.",
    };
  }

  const numericAge = Number(age);

  if (!Number.isInteger(numericAge)) {
    return {
      valid: false,
      message: "Age must be a whole number.",
    };
  }

  if (numericAge < 18 || numericAge > 120) {
    return {
      valid: false,
      message: "Age must be between 18 and 120.",
    };
  }

  return {
    valid: true,
    age: numericAge,
    message: "Client age is valid.",
  };
};

module.exports = validateClientAge;