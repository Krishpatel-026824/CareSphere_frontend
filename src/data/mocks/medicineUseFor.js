/** Clinically accurate, patient-friendly indications keyed by pharmacy catalog id. */
export const medicineUseForById = {
  'med-1': 'Mild to moderate pain & fever',
  'med-2': 'Mild to moderate pain & fever',
  'med-3': 'Fever, headache & body pain',
  'med-4': 'Pain, fever & inflammation',
  'med-5': 'Headache & mild pain',
  'med-6': 'Pain, fever & inflammation',
  'med-7': 'Pain, fever & inflammation',
  'med-8': 'Allergic rhinitis, hay fever & hives',
  'med-9': 'Allergic rhinitis & chronic hives',
  'med-10': 'Allergic rhinitis & hives',
  'med-11': 'Asthma prevention & allergic rhinitis',
  'med-12': 'Bacterial infections (as prescribed)',
  'med-13': 'Bacterial infections (as prescribed)',
  'med-14': 'Type 2 diabetes blood sugar control',
  'med-15': 'Type 2 diabetes blood sugar control',
  'med-16': 'Type 2 diabetes blood sugar control',
  'med-17': 'Acid reflux, GERD & stomach ulcer',
  'med-18': 'Acid reflux, GERD & stomach ulcer',
  'med-19': 'Acidity, reflux & bloating',
  'med-20': 'Heartburn & acid reflux',
  'med-21': 'Acidity, gas & indigestion',
  'med-22': 'Acidity & indigestion relief',
  'med-23': 'Nausea, vomiting & bloating',
  'med-24': 'Nausea & vomiting',
  'med-25': 'High cholesterol & heart risk reduction',
  'med-26': 'High blood pressure',
  'med-27': 'High blood pressure & angina',
  'med-28': 'High blood pressure',
  'med-29': 'Heart attack & stroke prevention (low-dose aspirin)',
  'med-30': 'Hypothyroidism (underactive thyroid)',
  'med-31': 'High blood pressure & heart failure',
  'med-32': 'Severe inflammation, allergy & asthma flare',
  'med-33': 'Vitamin D deficiency & bone health',
  'med-34': 'Vitamin C deficiency & antioxidant support',
  'med-35': 'Calcium deficiency & bone health',
  'med-36': 'Calcium & vitamin D supplementation',
  'med-37': 'Iron-deficiency anemia',
  'med-38': 'Vitamin & mineral supplementation',
  'med-39': 'B-vitamin deficiency & nerve support',
  'med-40': 'General vitamin & mineral supplementation',
  'med-41': 'Cough & throat irritation',
  'med-42': 'Dry cough soothing',
  'med-43': 'Sore throat & mouth irritation',
  'med-44': 'Nasal congestion & blocked nose',
  'med-45': 'Cold congestion & muscle ache (topical)',
  'med-46': 'Wound disinfection & skin antiseptic',
  'med-47': 'Muscle & joint pain (topical)',
  'med-48': 'Muscle pain, sprains & backache (topical)',
  'med-49': 'Minor burns, cuts & wounds (topical)',
  'med-50': 'Dehydration & electrolyte loss',
  'med-51': 'Dry eye & eye irritation',
  'med-52': 'Cough & throat soothing (supplement)',
  'med-53': 'Viral infections (as prescribed)',
  'med-54': 'Mild pain & fever (low strength)',
  'med-55': 'Dehydration & electrolyte replacement',
  'med-56': 'Productive cough & chest congestion',
  'med-57': 'Dry cough suppression',
  'med-58': 'Children’s fever & pain',
  'med-59': 'Children’s fever & pain',
  'med-60': 'Children’s pain & fever',
  'med-61': 'Asthma, wheezing & bronchospasm',
  'med-62': 'Children’s allergy & hay fever',
  'med-63': 'Children’s vitamin supplementation',
  'med-64': 'Cough & throat soothing (herbal)',
  'med-65': 'Cough with phlegm & nasal congestion',
  'med-66': 'High blood pressure, angina & heart rate control',
}

export function getMedicineUseFor(item = {}) {
  if (item.id && medicineUseForById[item.id]) {
    return medicineUseForById[item.id]
  }

  const fromSubtitle = String(item.subtitle || '')
    .split('•')[0]
    .trim()
  if (fromSubtitle) return fromSubtitle

  const byCategory = {
    analgesics: 'Pain & fever',
    cetirizines: 'Allergy & hay fever',
    allergies: 'Allergy & nasal symptoms',
    antibiotics: 'Bacterial infections (as prescribed)',
    metformins: 'Type 2 diabetes',
    syrups: 'Cough, cold & fever',
    fluids: 'Dehydration & electrolyte loss',
    others: 'As prescribed by doctor',
  }

  return byCategory[item.category] || 'As prescribed by doctor'
}
