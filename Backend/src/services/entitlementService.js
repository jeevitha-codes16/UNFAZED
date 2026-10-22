const subscriptionTiers = {
  free: {
    name: "Free",
    maxClients: 5,
    maxAppointmentsPerMonth: 10,
    features: ["basic_profile", "appointment_scheduling"],
  },

  basic: {
    name: "Basic",
    maxClients: 25,
    maxAppointmentsPerMonth: 100,
    features: [
      "basic_profile",
      "appointment_scheduling",
      "client_management",
      "email_notifications",
    ],
  },

  premium: {
    name: "Premium",
    maxClients: Infinity,
    maxAppointmentsPerMonth: Infinity,
    features: [
      "basic_profile",
      "appointment_scheduling",
      "client_management",
      "email_notifications",
      "video_sessions",
      "clinical_notes",
      "live_chat",
      "analytics",
    ],
  },
};

// Get the configuration for a subscription tier
const getTier = (tierName = "free") => {
  const tier = subscriptionTiers[tierName.toLowerCase()];

  if (!tier) {
    throw new Error(`Unknown subscription tier: ${tierName}`);
  }

  return tier;
};

// Check whether a subscription includes a particular feature
const hasFeatureAccess = (tierName, featureName) => {
  const tier = getTier(tierName);
  return tier.features.includes(featureName);
};

// Check whether the client limit has been reached
const canAddClient = (tierName, currentClientCount) => {
  const tier = getTier(tierName);

  return (
    Number.isInteger(currentClientCount) &&
    currentClientCount >= 0 &&
    currentClientCount < tier.maxClients
  );
};

// Check whether another appointment can be created this month
const canCreateAppointment = (tierName, currentMonthlyAppointments) => {
  const tier = getTier(tierName);

  return (
    Number.isInteger(currentMonthlyAppointments) &&
    currentMonthlyAppointments >= 0 &&
    currentMonthlyAppointments < tier.maxAppointmentsPerMonth
  );
};

module.exports = {
  subscriptionTiers,
  getTier,
  hasFeatureAccess,
  canAddClient,
  canCreateAppointment,
};