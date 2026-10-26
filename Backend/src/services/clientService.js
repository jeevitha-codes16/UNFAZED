const VALID_INTAKE_STATUSES = [
  "pending",
  "in_progress",
  "completed",
];

// Validate and normalize client details
const validateClient = ({
  name,
  email,
  phone = "",
  intakeStatus = "pending",
}) => {
  if (typeof name !== "string" || !name.trim()) {
    throw new Error("Client name is required.");
  }

  if (name.trim().length > 100) {
    throw new Error("Client name cannot exceed 100 characters.");
  }

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    throw new Error("A valid client email is required.");
  }

  if (typeof phone !== "string") {
    throw new Error("Client phone number must be text.");
  }

  if (!VALID_INTAKE_STATUSES.includes(intakeStatus)) {
    throw new Error("Invalid intake status.");
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    intakeStatus,
  };
};

// Search clients by name or email
const searchClients = (clients = [], searchTerm = "") => {
  if (!Array.isArray(clients)) {
    throw new Error("Clients must be provided as an array.");
  }

  if (typeof searchTerm !== "string") {
    throw new Error("Search term must be text.");
  }

  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return clients;
  }

  return clients.filter((client) => {
    const name = String(client.name || "").toLowerCase();
    const email = String(client.email || "").toLowerCase();

    return name.includes(query) || email.includes(query);
  });
};

// Calculate intake completion percentage
const getIntakeCompletionRate = (clients = []) => {
  if (!Array.isArray(clients)) {
    throw new Error("Clients must be provided as an array.");
  }

  if (clients.length === 0) {
    return 0;
  }

  const completedCount = clients.filter(
    (client) => client.intakeStatus === "completed"
  ).length;

  return Number(((completedCount / clients.length) * 100).toFixed(2));
};

module.exports = {
  VALID_INTAKE_STATUSES,
  validateClient,
  searchClients,
  getIntakeCompletionRate,
};