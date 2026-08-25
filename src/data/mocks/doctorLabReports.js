import { labImages } from './labImages'

export const doctorLabReportTemplatesMock = {
  'lab-1': {
    testCode: 'LIPID-201',
    preview: labImages.lipidReport,
    parameters: [
      { name: 'Total Cholesterol', value: '212', unit: 'mg/dL', reference: '< 200', status: 'High' },
      { name: 'HDL Cholesterol', value: '44', unit: 'mg/dL', reference: '> 40', status: 'Normal' },
      { name: 'LDL Cholesterol', value: '138', unit: 'mg/dL', reference: '< 130', status: 'High' },
      { name: 'Triglycerides', value: '168', unit: 'mg/dL', reference: '< 150', status: 'High' },
      { name: 'VLDL Cholesterol', value: '34', unit: 'mg/dL', reference: '5 – 40', status: 'Normal' },
    ],
    interpretation:
      'Borderline high LDL and triglycerides. Recommend diet counselling and repeat lipid panel in 12 weeks.',
  },
  'lab-2': {
    testCode: 'CARD-118',
    preview: labImages.cbcReport,
    parameters: [
      { name: 'Troponin I', value: '0.012', unit: 'ng/mL', reference: '< 0.04', status: 'Normal' },
      { name: 'CK-MB', value: '2.1', unit: 'ng/mL', reference: '0.6 – 6.3', status: 'Normal' },
      { name: 'ECG Rhythm', value: 'Sinus', unit: '', reference: 'Sinus rhythm', status: 'Normal' },
      { name: 'ECG Rate', value: '78', unit: 'bpm', reference: '60 – 100', status: 'Normal' },
      { name: 'ST Changes', value: 'None', unit: '', reference: 'No acute changes', status: 'Normal' },
    ],
    interpretation:
      'No acute ischemic changes on ECG. Troponin is within normal limits. Continue chest pain follow-up plan.',
  },
  'lab-3': {
    testCode: 'CBC-THY-301',
    preview: labImages.thyroidReport,
    parameters: [
      { name: 'Hemoglobin', value: '11.8', unit: 'g/dL', reference: '12.0 – 15.5', status: 'Low' },
      { name: 'WBC Count', value: '6,400', unit: '/µL', reference: '4,000 – 11,000', status: 'Normal' },
      { name: 'Platelet Count', value: '2.1', unit: 'lakhs/µL', reference: '1.5 – 4.5', status: 'Normal' },
      { name: 'TSH', value: '4.8', unit: 'µIU/mL', reference: '0.4 – 4.5', status: 'High' },
      { name: 'Free T4', value: '0.9', unit: 'ng/dL', reference: '0.8 – 1.8', status: 'Normal' },
    ],
    interpretation:
      'Mild anemia with borderline high TSH. Review fatigue symptoms and consider thyroid follow-up in 6 weeks.',
  },
  'lab-4': {
    testCode: 'HBA1C-404',
    preview: labImages.hba1cReport,
    parameters: [
      { name: 'HbA1c', value: '6.4', unit: '%', reference: '4.0 – 5.6', status: 'High' },
      { name: 'Estimated Avg Glucose', value: '137', unit: 'mg/dL', reference: '68 – 126', status: 'High' },
      { name: 'Fasting Glucose', value: '118', unit: 'mg/dL', reference: '70 – 100', status: 'High' },
    ],
    interpretation:
      'HbA1c is in the prediabetes range. Reinforce lifestyle changes and review cardiac risk at next visit.',
  },
  'lab-5': {
    testCode: 'LIPID-LFT-505',
    preview: labImages.lft,
    parameters: [
      { name: 'Total Cholesterol', value: '224', unit: 'mg/dL', reference: '< 200', status: 'High' },
      { name: 'LDL Cholesterol', value: '146', unit: 'mg/dL', reference: '< 130', status: 'High' },
      { name: 'SGPT (ALT)', value: '34', unit: 'U/L', reference: '7 – 56', status: 'Normal' },
      { name: 'SGOT (AST)', value: '29', unit: 'U/L', reference: '8 – 45', status: 'Normal' },
      { name: 'Bilirubin Total', value: '0.7', unit: 'mg/dL', reference: '0.2 – 1.2', status: 'Normal' },
    ],
    interpretation:
      'Elevated LDL with normal liver enzymes. Safe to consider statin therapy after fasting confirmation.',
  },
  'lab-6': {
    testCode: 'KFT-606',
    preview: labImages.kft,
    parameters: [
      { name: 'Sodium', value: '139', unit: 'mEq/L', reference: '136 – 145', status: 'Normal' },
      { name: 'Potassium', value: '4.2', unit: 'mEq/L', reference: '3.5 – 5.1', status: 'Normal' },
      { name: 'Creatinine', value: '1.1', unit: 'mg/dL', reference: '0.7 – 1.3', status: 'Normal' },
      { name: 'Urea', value: '28', unit: 'mg/dL', reference: '15 – 40', status: 'Normal' },
      { name: 'eGFR', value: '88', unit: 'mL/min', reference: '> 90', status: 'Low' },
    ],
    interpretation:
      'Electrolytes are stable. Mildly reduced eGFR — review BP medicines before dose escalation.',
  },
}

export const doctorLabFacilityMock = {
  name: 'CareSphere Diagnostics',
  accreditation: 'NABL Accredited · ISO 15189',
  address: 'SG Highway, Ahmedabad – 380015',
  pathologist: 'Dr. Helen Brooks, MD (Pathology)',
}

export const doctorLabReportsPageMock = {
  title: 'Patient lab reports',
  subtitle: 'Review completed test results from your patients',
  listTitle: 'Lab reports',
  empty: 'No lab reports are available yet.',
}
