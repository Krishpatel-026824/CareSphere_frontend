export const labReportTemplatesExtendedMock = {
  'lab-12': {
    testCode: 'FBS-012',
    parameters: [
      { name: 'Fasting Blood Glucose', value: '92', unit: 'mg/dL', reference: '70 – 100', status: 'Normal' },
      { name: 'Fasting Duration', value: '10', unit: 'hours', reference: '8 – 12', status: 'Normal' },
    ],
    interpretation: 'Fasting glucose is within normal limits. No evidence of impaired fasting glucose.',
  },
  'lab-13': {
    testCode: 'PPBS-013',
    parameters: [
      { name: 'Post Prandial Glucose', value: '128', unit: 'mg/dL', reference: '< 140', status: 'Normal' },
      { name: 'Meal Type', value: 'Standard breakfast', unit: '—', reference: '2 hr post meal', status: 'Normal' },
    ],
    interpretation: 'Post-meal glucose is within acceptable range for non-diabetic adults.',
  },
  'lab-14': {
    testCode: 'B12-014',
    parameters: [
      { name: 'Vitamin B12', value: '412', unit: 'pg/mL', reference: '211 – 911', status: 'Normal' },
      { name: 'Homocysteine', value: '9.8', unit: 'µmol/L', reference: '5 – 15', status: 'Normal' },
    ],
    interpretation: 'Vitamin B12 stores are adequate. No supplementation change required.',
  },
  'lab-15': {
    testCode: 'CAP-015',
    parameters: [
      { name: 'Calcium', value: '9.3', unit: 'mg/dL', reference: '8.6 – 10.2', status: 'Normal' },
      { name: 'Phosphorus', value: '3.4', unit: 'mg/dL', reference: '2.5 – 4.5', status: 'Normal' },
      { name: 'Albumin', value: '4.2', unit: 'g/dL', reference: '3.5 – 5.0', status: 'Normal' },
    ],
    interpretation: 'Calcium and phosphorus balance is within normal range.',
  },
  'lab-16': {
    testCode: 'ELEC-016',
    parameters: [
      { name: 'Sodium', value: '139', unit: 'mEq/L', reference: '136 – 145', status: 'Normal' },
      { name: 'Potassium', value: '4.2', unit: 'mEq/L', reference: '3.5 – 5.1', status: 'Normal' },
      { name: 'Chloride', value: '102', unit: 'mEq/L', reference: '98 – 107', status: 'Normal' },
      { name: 'Bicarbonate', value: '24', unit: 'mEq/L', reference: '22 – 29', status: 'Normal' },
    ],
    interpretation: 'Electrolyte panel is balanced with no correction needed.',
  },
  'lab-17': {
    testCode: 'ESR-017',
    parameters: [
      { name: 'ESR', value: '12', unit: 'mm/hr', reference: '0 – 15', status: 'Normal' },
    ],
    interpretation: 'ESR is not elevated. No significant inflammatory activity suggested.',
  },
  'lab-18': {
    testCode: 'COAG-018',
    parameters: [
      { name: 'Prothrombin Time', value: '12.8', unit: 'seconds', reference: '11 – 13.5', status: 'Normal' },
      { name: 'INR', value: '1.0', unit: 'ratio', reference: '0.8 – 1.2', status: 'Normal' },
      { name: 'APTT', value: '28', unit: 'seconds', reference: '25 – 35', status: 'Normal' },
    ],
    interpretation: 'Coagulation profile is within normal limits.',
  },
  'lab-19': {
    testCode: 'TEST-019',
    parameters: [
      { name: 'Total Testosterone', value: '520', unit: 'ng/dL', reference: '264 – 916', status: 'Normal' },
      { name: 'Free Testosterone', value: '12.4', unit: 'pg/mL', reference: '8.7 – 25.1', status: 'Normal' },
    ],
    interpretation: 'Testosterone levels are within age-appropriate reference range.',
  },
  'lab-20': {
    testCode: 'PRL-020',
    parameters: [
      { name: 'Prolactin', value: '11.2', unit: 'ng/mL', reference: '4 – 15', status: 'Normal' },
    ],
    interpretation: 'Prolactin is within normal limits. No pituitary hypersecretion indicated.',
  },
  'lab-21': {
    testCode: 'STOOL-021',
    parameters: [
      { name: 'Colour', value: 'Brown', unit: '—', reference: 'Brown', status: 'Normal' },
      { name: 'Consistency', value: 'Formed', unit: '—', reference: 'Formed', status: 'Normal' },
      { name: 'Occult blood', value: 'Negative', unit: '—', reference: 'Negative', status: 'Normal' },
      { name: 'Parasites', value: 'Not seen', unit: '—', reference: 'Not seen', status: 'Normal' },
    ],
    interpretation: 'Stool routine and microscopy shows no infection or occult bleeding.',
  },
  'lab-22': {
    testCode: 'ECG-022',
    parameters: [
      { name: 'Rhythm', value: 'Normal sinus', unit: '—', reference: 'Sinus', status: 'Normal' },
      { name: 'Rate', value: '72', unit: 'bpm', reference: '60 – 100', status: 'Normal' },
      { name: 'PR interval', value: '160', unit: 'ms', reference: '120 – 200', status: 'Normal' },
      { name: 'QRS duration', value: '88', unit: 'ms', reference: '70 – 110', status: 'Normal' },
      { name: 'QTc', value: '410', unit: 'ms', reference: '< 450', status: 'Normal' },
    ],
    interpretation: 'ECG shows normal sinus rhythm without ischemic changes or arrhythmia.',
  },
}
