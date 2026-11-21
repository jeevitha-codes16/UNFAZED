const convertToCSV = (data, headers) => {
  if (!Array.isArray(data) || !Array.isArray(headers)) {
    throw new Error("Data and headers must be arrays.");
  }

  if (headers.length === 0) {
    throw new Error("At least one header is required.");
  }

  const escapeCSVValue = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    let text = value instanceof Date
      ? value.toISOString()
      : String(value);

    // Prevent spreadsheet formula injection
    if (/^[=+\-@]/.test(text)) {
      text = "'" + text;
    }

    // Escape double quotes
    text = text.replace(/"/g, '""');

    // Wrap values containing special CSV characters
    if (/[,"\n\r]/.test(text)) {
      text = `"${text}"`;
    }

    return text;
  };

  const headerRow = headers
    .map(escapeCSVValue)
    .join(",");

  const dataRows = data.map((item) =>
    headers
      .map((header) => escapeCSVValue(item?.[header]))
      .join(",")
  );

  return [headerRow, ...dataRows].join("\n");
};

module.exports = convertToCSV;