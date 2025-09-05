const paymentMethods = ["Cash", "Bank Transfer", "Mobile Wallet", "Cheque", "Credit Terms"];
export const paymentMethodOptions = paymentMethods.map((method) => ({
  label: method,
  value: method,
}));
export default paymentMethods;
