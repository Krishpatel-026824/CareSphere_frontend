export const healthRecordReportsMock = {
  'rec-5': {
    labTemplate: 'lab-2',
    reportId: 'CS-LIP-2025-0608',
    hospital: 'CareSphere Diagnostics',
    image: 'lipid',
    visit: {
      mode: 'Fasting lab draw',
      reason: 'Cardiovascular risk screening',
      referredBy: 'Dr. Daniel Brooks',
    },
    recommendations: [
      'Continue a low-saturated-fat diet and 30 minutes of daily walking.',
      'Repeat lipid profile in 6 months or sooner if advised.',
      'Keep this report for your next cardiology visit.',
    ],
  },
  'rec-6': {
    labTemplate: 'lab-3',
    reportId: 'CS-THY-2025-0601',
    hospital: 'CareSphere Diagnostics',
    image: 'thyroid',
    visit: {
      mode: 'Morning lab draw',
      reason: 'Thyroid function review',
      referredBy: 'Dr. Emily Walsh',
    },
    recommendations: [
      'No thyroid medication change is needed at this time.',
      'Recheck TSH in 12 months, or earlier if fatigue or palpitations appear.',
    ],
  },
  'rec-7': {
    reportId: 'CS-CXR-2025-0522',
    hospital: 'CareSphere Imaging Centre',
    image: 'xray',
    visit: {
      mode: 'In-clinic imaging',
      reason: 'Cough and chest discomfort screening',
      referredBy: 'Dr. Michael Reed',
    },
    findings: [
      { label: 'Technique', value: 'PA chest radiograph', unit: '—', reference: 'Adequate', status: 'Normal' },
      { label: 'Lung fields', value: 'Clear, no infiltrate', unit: '—', reference: 'Clear', status: 'Normal' },
      { label: 'Heart size', value: 'Normal cardiothoracic ratio', unit: '—', reference: '< 0.5', status: 'Normal' },
      { label: 'Costophrenic angles', value: 'Sharp, no effusion', unit: '—', reference: 'Sharp', status: 'Normal' },
      { label: 'Mediastinum', value: 'Central, unremarkable', unit: '—', reference: 'Normal', status: 'Normal' },
      { label: 'Bony thorax', value: 'No fracture seen', unit: '—', reference: 'Intact', status: 'Normal' },
      { label: 'Impression', value: 'No acute cardiopulmonary disease', unit: '—', reference: 'Normal study', status: 'Normal' },
    ],
    interpretation:
      'Chest X-ray shows clear lungs, normal heart size, and no pleural effusion or pneumothorax. No acute finding to explain cough at this time.',
    recommendations: [
      'Continue prescribed inhaler or cough care as advised.',
      'Return if fever, breathlessness, or chest pain worsens.',
      'No repeat imaging needed unless symptoms persist beyond 2 weeks.',
    ],
  },
  'rec-8': {
    labTemplate: 'lab-4',
    reportId: 'CS-A1C-2025-0518',
    hospital: 'CareSphere Diagnostics',
    image: 'hba1c',
    visit: {
      mode: 'Lab draw',
      reason: 'Glycemic control check',
      referredBy: 'Dr. Olivia Hart',
    },
    recommendations: [
      'Maintain current diet and activity; no diabetes medication indicated.',
      'Repeat HbA1c in 12 months with annual labs.',
    ],
  },
  'rec-9': {
    labTemplate: 'lab-7',
    reportId: 'CS-VITD-2025-0505',
    hospital: 'CareSphere Diagnostics',
    image: 'vitamind',
    visit: {
      mode: 'Lab draw',
      reason: 'Vitamin D follow-up after supplementation',
      referredBy: 'Dr. Claire Morgan',
    },
    recommendations: [
      'Continue maintenance Vitamin D3 as prescribed.',
      'Include sunlight exposure and dairy or fortified foods.',
      'Recheck 25-OH Vitamin D in 6 months.',
    ],
  },
  'rec-10': {
    reportId: 'CS-BP-2025-0430',
    hospital: 'CareSphere Heart Centre',
    image: 'bp',
    visit: {
      mode: 'Clinic vitals log',
      reason: 'Home and clinic blood pressure review',
      referredBy: 'Dr. James Carter',
    },
    findings: [
      { label: 'Sitting BP', value: '118/76', unit: 'mmHg', reference: '< 120/80', status: 'Normal' },
      { label: 'Standing BP', value: '116/74', unit: 'mmHg', reference: '< 120/80', status: 'Normal' },
      { label: '7-day home average', value: '120/78', unit: 'mmHg', reference: '< 130/80', status: 'Normal' },
      { label: 'Heart rate', value: '72', unit: 'bpm', reference: '60 – 100', status: 'Normal' },
      { label: 'Peak reading', value: '128/82', unit: 'mmHg', reference: '< 140/90', status: 'Normal' },
      { label: 'Symptoms', value: 'None reported', unit: '—', reference: 'None', status: 'Normal' },
    ],
    interpretation:
      'Clinic and home blood pressure readings are in the normal range. No hypertensive pattern on this log.',
    recommendations: [
      'Continue home monitoring 2–3 times per week.',
      'Limit added salt and keep evening walks consistent.',
      'Share this log at the next cardiology visit.',
    ],
  },
  'rec-11': {
    labTemplate: 'lab-1',
    reportId: 'CS-CBC-2025-0416',
    hospital: 'CareSphere Diagnostics',
    image: 'cbc',
    visit: {
      mode: 'Lab draw',
      reason: 'Routine complete blood count',
      referredBy: 'Dr. Robert Hayes',
    },
    recommendations: [
      'No hematology treatment required from this CBC.',
      'Repeat if fever, unusual bruising, or fatigue develops.',
    ],
  },
  'rec-12': {
    reportId: 'CS-DERM-2025-0410',
    hospital: 'CareSphere Skin Clinic',
    image: 'derm',
    visit: {
      mode: 'In-clinic follow-up',
      reason: 'Review of seasonal allergy flare',
      referredBy: 'Dr. Sophia Bennett',
    },
    findings: [
      { label: 'Skin exam', value: 'Mild residual dryness', unit: '—', reference: 'Clear / improving', status: 'Normal' },
      { label: 'Itch score', value: '2 / 10', unit: 'score', reference: '0 – 3 mild', status: 'Normal' },
      { label: 'Active rash', value: 'None today', unit: '—', reference: 'None', status: 'Normal' },
      { label: 'Cetirizine response', value: 'Good control', unit: '—', reference: 'Improved', status: 'Normal' },
      { label: 'Infection signs', value: 'Absent', unit: '—', reference: 'Absent', status: 'Normal' },
    ],
    interpretation:
      'Dermatology follow-up shows the prior flare is settling. Skin is dry but without active dermatitis or infection.',
    recommendations: [
      'Continue fragrance-free moisturizer twice daily.',
      'Use Cetirizine 10 mg only on high-pollen days.',
      'Return if rash spreads or sleep is disturbed by itch.',
    ],
  },
  'rec-13': {
    reportId: 'CS-RX-2025-0403',
    status: 'Delivered',
    hospital: 'CareSphere Pharmacy · Order #PH-90114',
    image: 'refill',
    visit: {
      mode: 'Home delivery',
      reason: 'Metformin refill',
      referredBy: 'Self order via CareSphere app',
    },
    findings: [
      { label: 'Metformin 500mg', value: '30 tablets', unit: 'strip', reference: 'Twice daily', status: 'Normal' },
      { label: 'Quantity', value: '1 pack', unit: '—', reference: '30-day supply', status: 'Normal' },
      { label: 'Subtotal', value: '₹86', unit: '—', reference: '—', status: 'Normal' },
      { label: 'Delivery fee', value: 'Free', unit: '—', reference: '—', status: 'Normal' },
      { label: 'Total paid', value: '₹86', unit: '—', reference: 'Paid', status: 'Normal' },
      { label: 'Payment method', value: 'UPI', unit: '—', reference: 'Paid', status: 'Normal' },
      { label: 'Delivery status', value: 'Delivered', unit: '—', reference: 'Same day', status: 'Normal' },
    ],
    interpretation:
      'Refill PH-90114 was dispensed and delivered. Take Metformin with meals unless your doctor changes the dose.',
    recommendations: [
      'Do not skip doses; take with breakfast and dinner.',
      'Watch for stomach upset in the first days of a refill pack.',
      'Keep this receipt for pharmacy and clinic records.',
    ],
    verifiedBy: 'CareSphere Pharmacy · Licensed dispenser',
  },
  'rec-14': {
    labTemplate: 'lab-5',
    reportId: 'CS-LFT-2025-0321',
    hospital: 'CareSphere Diagnostics',
    image: 'lft',
    visit: {
      mode: 'Fasting lab draw',
      reason: 'Liver enzyme screen',
      referredBy: 'Dr. Natalie Cruz',
    },
    recommendations: [
      'No liver-directed treatment needed from this result.',
      'Limit alcohol and unnecessary over-the-counter pain tablets.',
      'Repeat LFT if jaundice, dark urine, or right-upper pain appears.',
    ],
  },
  'rec-15': {
    reportId: 'CS-VAC-2025-0212',
    hospital: 'CareSphere Wellness Clinic',
    image: 'vaccine',
    visit: {
      mode: 'In-clinic immunization',
      reason: 'Seasonal influenza vaccination',
      referredBy: 'Dr. Hannah Cole',
    },
    findings: [
      { label: 'Vaccine', value: 'Influenza quadrivalent', unit: '—', reference: 'Age-appropriate', status: 'Normal' },
      { label: 'Dose', value: '0.5', unit: 'mL IM', reference: '0.5 mL', status: 'Normal' },
      { label: 'Site', value: 'Left deltoid', unit: '—', reference: 'Deltoid', status: 'Normal' },
      { label: 'Batch / lot', value: 'FL-2291-B', unit: '—', reference: 'Logged', status: 'Normal' },
      { label: 'Immediate reaction', value: 'None', unit: '—', reference: 'None', status: 'Normal' },
      { label: 'Next due', value: 'Feb 2026', unit: '—', reference: 'Annually', status: 'Normal' },
    ],
    interpretation:
      'Influenza vaccine was administered without immediate adverse reaction. Protection typically begins within 2 weeks.',
    recommendations: [
      'Mild arm soreness for 1–2 days is expected.',
      'Seek care for rash, breathing difficulty, or high fever after vaccination.',
      'Schedule next flu vaccine in February 2026.',
    ],
  },
  'rec-16': {
    reportId: 'CS-MRI-2025-0128',
    hospital: 'CareSphere Imaging Centre',
    image: 'mri',
    visit: {
      mode: 'MRI suite',
      reason: 'Headache workup, no contrast',
      referredBy: 'Dr. Thomas Grant',
    },
    findings: [
      { label: 'Technique', value: 'MRI brain without contrast', unit: '—', reference: 'Diagnostic', status: 'Normal' },
      { label: 'Brain parenchyma', value: 'Normal signal', unit: '—', reference: 'Normal', status: 'Normal' },
      { label: 'Ventricles', value: 'Normal size', unit: '—', reference: 'Normal', status: 'Normal' },
      { label: 'Mass / bleed', value: 'None detected', unit: '—', reference: 'None', status: 'Normal' },
      { label: 'Sinuses', value: 'Mild mucosal thickening', unit: '—', reference: 'Mild acceptable', status: 'Normal' },
      { label: 'Impression', value: 'No acute intracranial abnormality', unit: '—', reference: 'Normal study', status: 'Normal' },
    ],
    interpretation:
      'MRI brain without contrast shows no mass, bleed, or acute infarct. Mild sinus thickening is incidental and not an emergency finding.',
    recommendations: [
      'Continue headache care as advised by neurology.',
      'Return urgently for sudden worst headache, weakness, or vision loss.',
      'No repeat MRI unless symptoms change.',
    ],
  },
}
