export const pharmacyBillingMock = {
  deliveryFee: 40,
  freeDeliveryMin: 500,
  taxPercent: 5,
  estimateLabel: 'Estimated delivery',
  leadMinutes: 180,
  windowMinutes: 120,
  cutoffHour: 20,
  nextDayHour: 10,
  orderSteps: [
    { id: 'payment', label: 'Payment' },
    { id: 'processing', label: 'Processing' },
    { id: 'delivery', label: 'Out for delivery' },
  ],
  paymentMethods: [
    {
      id: 'upi',
      label: 'UPI',
      detail: 'Pay instantly with PhonePe, GPay or Paytm',
      logos: ['PhonePe', 'GPay', 'Paytm'],
    },
    {
      id: 'card',
      label: 'Debit / Credit card',
      detail: 'Visa, Mastercard, RuPay',
      logos: ['Visa', 'Mastercard', 'RuPay'],
    },
    {
      id: 'cod',
      label: 'Cash on delivery',
      detail: 'Pay when your order arrives',
      icon: 'truck',
    },
  ],
}
