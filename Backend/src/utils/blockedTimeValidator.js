
const validateBlockedTime = (data) => {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      isValid: false,
      errors: ["Invalid blocked-time information."],
    };
  }

  const { startAt, endAt, reason, timezone } = data;

  if (!startAt || !endAt) {
    errors.push("Start date and end date are required.");
  }

  const start = new Date(startAt);
  const end = new Date(endAt);

  if (
    !startAt ||
    !endAt ||
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    errors.push("Please provide valid start and end dates.");
  } else if (end <= start) {
    errors.push("End date must be later than start date.");
  }

  if (reason !== undefined) {
    if (typeof reason !== "string" || reason.trim().length > 500) {
      errors.push("Reason must be text with a maximum of 500 characters.");
    }
  }

  if (timezone !== undefined) {
    if (typeof timezone !== "string" || !timezone.trim()) {
      errors.push("Please provide a valid timezone.");
    } else {
      try {
        new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
        });
      } catch {
        errors.push("Invalid timezone.");
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    value: errors.length === 0
      ? {
          startAt: start,
          endAt: end,
          reason: reason?.trim() || "Unavailable",
          timezone: timezone?.trim() || "Asia/Kolkata",
        }
      : null,
  };
};

module.exports = validateBlockedTime;
