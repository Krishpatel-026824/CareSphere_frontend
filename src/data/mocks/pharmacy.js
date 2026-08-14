export const pharmacyFilterOptionsMock = [
  { id: 'antibiotics', label: 'Antibiotics' },
  { id: 'analgesics', label: 'Analgesics' },
  { id: 'allergies', label: 'Allergies' },
  { id: 'cetirizines', label: 'Cetirizines' },
  { id: 'fluids', label: 'Fluids' },
  { id: 'metformins', label: 'Metformins' },
  { id: 'others', label: 'Others' },
]

export const pharmacyBrandOptionsMock = [
  { id: 'brand1', label: 'Brand 1' },
  { id: 'brand2', label: 'Brand 2' },
]

export const pharmacyRecentOrdersMock = [
  {
    id: 'order-1',
    label: 'Order #CS-1842',
    date: '11 Aug 2026',
    bill: {
      lines: [
        { id: 'med-1', name: 'Dolo 650mg', quantity: 2, lineTotal: 68 },
        { id: 'med-5', name: 'Cetirizine 10mg', quantity: 1, lineTotal: 65 },
      ],
      subtotal: 133,
      deliveryFee: 40,
      tax: 7,
      taxPercent: 5,
      total: 180,
    },
  },
  {
    id: 'order-2',
    label: 'Order #CS-1838',
    date: '8 Aug 2026',
    bill: {
      lines: [
        { id: 'med-7', name: 'Amoxicillin 500mg', quantity: 1, lineTotal: 180 },
        { id: 'med-2', name: 'Paracetamol 500mg', quantity: 2, lineTotal: 56 },
      ],
      subtotal: 236,
      deliveryFee: 40,
      tax: 12,
      taxPercent: 5,
      total: 288,
    },
  },
  {
    id: 'order-3',
    label: 'Order #CS-1821',
    date: '2 Aug 2026',
    bill: {
      lines: [
        { id: 'med-6', name: 'Fabiflu 200mg', quantity: 1, lineTotal: 1290 },
      ],
      subtotal: 1290,
      deliveryFee: 0,
      tax: 65,
      taxPercent: 5,
      total: 1355,
    },
  },
]

export const pharmacyAccountLinksMock = [
  { id: 'addresses', label: 'Manage Addresses' },
  { id: 'payments', label: 'Payment Methods' },
]

export const pharmacySavedAddressesMock = [
  {
    id: 'addr-1',
    label: 'Home',
    line1: '12, Shanti Niketan Society',
    line2: 'Satellite Road, Ahmedabad – 380015',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr-2',
    label: 'Office',
    line1: 'CareSphere HQ, 4th Floor',
    line2: 'SG Highway, Ahmedabad – 380054',
    phone: '+91 98765 43210',
    isDefault: false,
  },
]

export const pharmacyPaymentMethodsMock = [
  {
    id: 'upi',
    label: 'UPI',
    detail: 'krish@upi · PhonePe',
    isDefault: true,
  },
  {
    id: 'card',
    label: 'Debit / Credit card',
    detail: 'HDFC **** 4821 · Exp 08/27',
    isDefault: false,
  },
  {
    id: 'cod',
    label: 'Cash on delivery',
    detail: 'Pay when your order arrives',
    isDefault: false,
  },
]

export const pharmacyFooterMock = 'Company Address, 10 Kijere Road. All rights reserved.'
