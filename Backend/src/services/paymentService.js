const calculatePayment = ({
  amount,
  discountPercent = 0,
  currency = "INR",
}) => {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  if (
    !Number.isFinite(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    throw new Error("Discount must be between 0 and 100.");
  }

  if (currency !== "INR") {
    throw new Error("Only INR is supported by this service.");
  }

  const originalAmount = Math.round(amount * 100) / 100;
  const discountAmount =
    Math.round(originalAmount * discountPercent) / 100;
  const finalAmount =
    Math.round((originalAmount - discountAmount) * 100) / 100;

  return {
    currency,
    originalAmount,
    discountPercent,
    discountAmount,
    finalAmount,
  };
};

// Convert rupees to paise for Razorpay order amounts
const toPaise = (amountInRupees) => {
  if (
    !Number.isFinite(amountInRupees) ||
    amountInRupees <= 0 ||
    !Number.isSafeInteger(Math.round(amountInRupees * 100))
  ) {
    throw new Error("A valid payment amount is required.");
  }

  return Math.round(amountInRupees * 100);
};

// Verify the basic status of a payment record
const isPaymentSuccessful = (payment) => {
  return Boolean(
    payment &&
    payment.status === "paid" &&
    payment.paymentId &&
    payment.orderId
  );
};

module.exports = {
  calculatePayment,
  toPaise,
  isPaymentSuccessful,
};