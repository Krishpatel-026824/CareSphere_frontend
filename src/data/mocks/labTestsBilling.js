export const labTestsBillingMock = {
  collectionFee: 99,
  freeCollectionMin: 1000,
  taxPercent: 5,
  patientName: 'Krish Patel',
  estimateLabel: 'Estimated collection',
  estimateValue: 'Tomorrow, 8–10 AM',
  orderSteps: [
    { id: 'payment', label: 'Payment' },
    { id: 'collection', label: 'Sample collection' },
    { id: 'report', label: 'Report ready' },
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
      label: 'Pay at collection',
      detail: 'Pay when the sample is collected',
      icon: 'truck',
    },
  ],
}
