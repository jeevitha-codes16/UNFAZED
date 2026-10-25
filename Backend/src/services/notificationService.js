const notificationChannels = ["email", "sms", "whatsapp"];

// Validate notification details
const validateNotification = ({ recipient, message }) => {
  if (typeof recipient !== "string" || !recipient.trim()) {
    throw new Error("A valid recipient is required.");
  }

  if (typeof message !== "string" || !message.trim()) {
    throw new Error("A notification message is required.");
  }

  return {
    recipient: recipient.trim(),
    message: message.trim(),
  };
};

// Send a notification through the selected channel
const sendNotification = async (channel, details) => {
  const selectedChannel = channel.toLowerCase();

  if (!notificationChannels.includes(selectedChannel)) {
    throw new Error(
      `Unsupported notification channel: ${selectedChannel}`
    );
  }

  const { recipient, message } = validateNotification(details);

  // Integration points for future notification providers
  switch (selectedChannel) {
    case "email":
      return sendEmail(recipient, message);

    case "sms":
      return sendSMS(recipient, message);

    case "whatsapp":
      return sendWhatsApp(recipient, message);

    default:
      throw new Error("Notification channel not supported.");
  }
};

// Email provider placeholder
const sendEmail = async (recipient, message) => {
  return {
    success: false,
    channel: "email",
    recipient,
    message: "Email provider is not configured yet.",
  };
};

// SMS provider placeholder
const sendSMS = async (recipient, message) => {
  return {
    success: false,
    channel: "sms",
    recipient,
    message: "SMS provider is not configured yet.",
  };
};

// WhatsApp provider placeholder
const sendWhatsApp = async (recipient, message) => {
  return {
    success: false,
    channel: "whatsapp",
    recipient,
    message: "WhatsApp provider is not configured yet.",
  };
};

module.exports = {
  notificationChannels,
  validateNotification,
  sendNotification,
};