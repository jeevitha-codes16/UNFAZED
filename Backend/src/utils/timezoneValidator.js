const validateTimezone = (timezone) => {
  if (typeof timezone !== "string" || !timezone.trim()) {
    return {
      valid: false,
      message: "Timezone is required.",
    };
  }

  const normalizedTimezone = timezone.trim();

  try {
    new Intl.DateTimeFormat("en-US", {
      timeZone: normalizedTimezone,
    });

    return {
      valid: true,
      timezone: normalizedTimezone,
      message: "Timezone is valid.",
    };
  } catch {
    return {
      valid: false,
      message: "Please provide a valid timezone.",
    };
  }
};

module.exports = validateTimezone;