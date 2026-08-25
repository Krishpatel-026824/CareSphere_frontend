const medicineInfoByName = {
  'Dolo 650mg': {
    salt: 'Paracetamol 650mg',
    manufacturer: 'Micro Labs Ltd',
    use: 'Fever, headache, body pain',
    sideEffects: 'Nausea, allergic rash (rare)',
    dosage: '1 tablet every 4–6 hours, max 4/day',
    storage: 'Store below 30°C',
    warning: 'Avoid alcohol. Do not exceed recommended dose.',
  },
  'Paracetamol 500mg': {
    salt: 'Paracetamol 500mg',
    manufacturer: 'Cipla Ltd',
    use: 'Mild to moderate pain, fever',
    sideEffects: 'Rare: skin rash, nausea',
    dosage: '1-2 tablets every 4-6 hours',
    storage: 'Store below 25°C in dry place',
    warning: 'Do not take with other paracetamol products.',
  },
  'Crocin Advance 500mg': {
    salt: 'Paracetamol 500mg',
    manufacturer: 'GSK',
    use: 'Fever, body pain, headache',
    sideEffects: 'Rare allergic reactions',
    dosage: '1-2 tablets every 4-6 hours',
    storage: 'Store below 30°C',
    warning: 'Consult doctor if symptoms persist beyond 3 days.',
  },
  'Ibuprofen 200mg': {
    salt: 'Ibuprofen 200mg',
    manufacturer: 'Cipla',
    use: 'Pain, inflammation, arthritis',
    sideEffects: 'Stomach pain, headache',
    dosage: '1-2 tablets 3 times daily after food',
    storage: 'Store below 30°C',
    warning: 'Take after meals. Avoid in kidney issues.',
  },
  'Montelukast 10mg': {
    salt: 'Montelukast Sodium 10mg',
    manufacturer: 'Sun Pharma',
    use: 'Asthma, allergic rhinitis',
    sideEffects: 'Headache, stomach pain',
    dosage: '1 tablet at bedtime',
    storage: 'Store below 30°C',
    warning: 'Not for acute asthma attacks.',
  },
  'Metformin 500mg': {
    salt: 'Metformin HCl 500mg',
    manufacturer: 'USV',
    use: 'Type 2 diabetes blood sugar control',
    sideEffects: 'Nausea, diarrhea, metallic taste',
    dosage: '1 tablet twice daily with meals',
    storage: 'Store below 30°C',
    warning: 'Take with food to reduce stomach upset.',
  },
  'Glycomet GP 1mg': {
    salt: 'Glimepiride 1mg + Metformin 500mg',
    manufacturer: 'USV',
    use: 'Type 2 diabetes',
    sideEffects: 'Low blood sugar, nausea',
    dosage: '1 tablet with breakfast',
    storage: 'Store below 25°C',
    warning: 'Monitor blood sugar regularly.',
  },
}

const medicineInfoFallback = {
  salt: null,
  manufacturer: 'Pharma Company',
  use: 'As prescribed by doctor',
  sideEffects: 'Consult doctor for details',
  dosage: 'As directed by physician',
  storage: 'Store in cool dry place below 30°C',
  warning: 'Read label before use. Keep away from children.',
}

export function getMedicineInfo(name) {
  const match = medicineInfoByName[name]
  if (match) return match
  return {
    ...medicineInfoFallback,
    salt: name || 'Medicine',
  }
}
