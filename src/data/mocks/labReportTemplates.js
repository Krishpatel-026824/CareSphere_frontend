import { labReportTemplatesExtendedMock } from './labReportTemplatesExtended'

export const labPatientMock = {
  name: 'Krish Patel',
  age: 32,
  gender: 'Male',
  patientId: 'CS-PAT-10482',
  phone: '+91 98765 43210',
}

export const labFacilityMock = {
  name: 'CareSphere Diagnostics',
  accreditation: 'NABL Accredited · ISO 15189',
  address: 'SG Highway, Ahmedabad – 380015',
  pathologist: 'Dr. Helen Brooks, MD (Pathology)',
}

export const labReportTemplatesMock = {
  'lab-1': {
    testCode: 'CBC-001',
    parameters: [
      { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', reference: '13.0 – 17.0', status: 'Normal' },
      { name: 'RBC Count', value: '4.8', unit: 'million/µL', reference: '4.5 – 5.5', status: 'Normal' },
      { name: 'WBC Count', value: '7,200', unit: '/µL', reference: '4,000 – 11,000', status: 'Normal' },
      { name: 'Platelet Count', value: '2.45', unit: 'lakhs/µL', reference: '1.5 – 4.5', status: 'Normal' },
      { name: 'Hematocrit', value: '42.1', unit: '%', reference: '40 – 50', status: 'Normal' },
      { name: 'MCV', value: '88', unit: 'fL', reference: '80 – 100', status: 'Normal' },
    ],
    interpretation:
      'All blood cell counts are within normal limits. No signs of anemia, infection, or platelet disorder detected.',
  },
  'lab-2': {
    testCode: 'LIPID-002',
    parameters: [
      { name: 'Total Cholesterol', value: '198', unit: 'mg/dL', reference: '< 200', status: 'Normal' },
      { name: 'HDL Cholesterol', value: '52', unit: 'mg/dL', reference: '> 40', status: 'Normal' },
      { name: 'LDL Cholesterol', value: '118', unit: 'mg/dL', reference: '< 130', status: 'Normal' },
      { name: 'Triglycerides', value: '142', unit: 'mg/dL', reference: '< 150', status: 'Normal' },
      { name: 'VLDL Cholesterol', value: '28', unit: 'mg/dL', reference: '5 – 40', status: 'Normal' },
      { name: 'Total/HDL Ratio', value: '3.8', unit: 'ratio', reference: '< 5.0', status: 'Normal' },
    ],
    interpretation:
      'Lipid profile is within desirable range. Continue a heart-healthy diet and regular exercise.',
  },
  'lab-3': {
    testCode: 'THY-003',
    parameters: [
      { name: 'TSH', value: '2.4', unit: 'µIU/mL', reference: '0.4 – 4.5', status: 'Normal' },
      { name: 'Free T3', value: '3.1', unit: 'pg/mL', reference: '2.3 – 4.2', status: 'Normal' },
      { name: 'Free T4', value: '1.2', unit: 'ng/dL', reference: '0.8 – 1.8', status: 'Normal' },
      { name: 'Anti-TPO Antibody', value: '12', unit: 'IU/mL', reference: '< 35', status: 'Normal' },
    ],
    interpretation:
      'Thyroid hormone levels are balanced. No evidence of hypo- or hyperthyroidism at this time.',
  },
  'lab-4': {
    testCode: 'HBA1C-004',
    parameters: [
      { name: 'HbA1c', value: '5.6', unit: '%', reference: '4.0 – 5.6', status: 'Normal' },
      { name: 'Estimated Avg Glucose', value: '114', unit: 'mg/dL', reference: '68 – 126', status: 'Normal' },
      { name: 'Fasting Glucose', value: '98', unit: 'mg/dL', reference: '70 – 100', status: 'Normal' },
    ],
    interpretation:
      'HbA1c is within non-diabetic range, indicating good long-term blood sugar control over the past 3 months.',
  },
  'lab-5': {
    testCode: 'LFT-005',
    parameters: [
      { name: 'SGPT (ALT)', value: '28', unit: 'U/L', reference: '7 – 56', status: 'Normal' },
      { name: 'SGOT (AST)', value: '24', unit: 'U/L', reference: '8 – 45', status: 'Normal' },
      { name: 'Bilirubin Total', value: '0.8', unit: 'mg/dL', reference: '0.2 – 1.2', status: 'Normal' },
      { name: 'Alkaline Phosphatase', value: '78', unit: 'U/L', reference: '44 – 147', status: 'Normal' },
    ],
    interpretation: 'Liver enzymes and bilirubin are within normal limits.',
  },
  'lab-6': {
    testCode: 'KFT-006',
    parameters: [
      { name: 'Creatinine', value: '0.9', unit: 'mg/dL', reference: '0.7 – 1.3', status: 'Normal' },
      { name: 'Urea', value: '22', unit: 'mg/dL', reference: '15 – 40', status: 'Normal' },
      { name: 'Uric Acid', value: '5.1', unit: 'mg/dL', reference: '3.5 – 7.2', status: 'Normal' },
      { name: 'eGFR', value: '98', unit: 'mL/min', reference: '> 90', status: 'Normal' },
    ],
    interpretation: 'Kidney function markers are within the expected range.',
  },
  'lab-7': {
    testCode: 'VITD-007',
    parameters: [
      { name: '25-Hydroxy Vitamin D', value: '38', unit: 'ng/mL', reference: '30 – 100', status: 'Normal' },
      { name: 'Calcium', value: '9.4', unit: 'mg/dL', reference: '8.6 – 10.2', status: 'Normal' },
    ],
    interpretation: 'Vitamin D level is sufficient. Continue regular sun exposure and diet.',
  },
  'lab-8': {
    testCode: 'IRON-008',
    parameters: [
      { name: 'Serum Iron', value: '92', unit: 'µg/dL', reference: '60 – 170', status: 'Normal' },
      { name: 'Ferritin', value: '86', unit: 'ng/mL', reference: '30 – 400', status: 'Normal' },
      { name: 'TIBC', value: '312', unit: 'µg/dL', reference: '250 – 450', status: 'Normal' },
    ],
    interpretation: 'Iron stores and transport are within normal limits. No anemia pattern detected.',
  },
  'lab-9': {
    testCode: 'CRP-009',
    parameters: [
      { name: 'hs-CRP', value: '1.2', unit: 'mg/L', reference: '< 3.0', status: 'Normal' },
    ],
    interpretation: 'CRP is not elevated. No significant systemic inflammation indicated.',
  },
  'lab-10': {
    testCode: 'IGE-010',
    parameters: [
      { name: 'Total IgE', value: '48', unit: 'IU/mL', reference: '< 100', status: 'Normal' },
      { name: 'Dust mite', value: 'Negative', unit: '', reference: 'Negative', status: 'Normal' },
      { name: 'Pollen mix', value: 'Negative', unit: '', reference: 'Negative', status: 'Normal' },
    ],
    interpretation: 'Allergy panel does not show significant IgE sensitization at this time.',
  },
  'lab-11': {
    testCode: 'URN-011',
    parameters: [
      { name: 'Colour', value: 'Pale yellow', unit: '', reference: 'Pale yellow', status: 'Normal' },
      { name: 'Protein', value: 'Nil', unit: '', reference: 'Nil', status: 'Normal' },
      { name: 'Glucose', value: 'Nil', unit: '', reference: 'Nil', status: 'Normal' },
      { name: 'RBC', value: '0–1', unit: '/hpf', reference: '0 – 2', status: 'Normal' },
    ],
    interpretation: 'Routine urinalysis with microscopy is within normal limits.',
  },
  ...labReportTemplatesExtendedMock,
}

export function getLabReportTemplate(testId) {
  return labReportTemplatesMock[testId] || null
}
