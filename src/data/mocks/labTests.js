import { labImages } from './labImages'

function test(id, name, description, price, turnaround, image, featured = false) {
  return {
    id,
    name,
    description,
    price,
    turnaround,
    featured,
    thumbnail: image,
    background: image,
  }
}

export const labTestsMock = [
  test('lab-1', 'Complete Blood Count (CBC)', 'Checks red cells, white cells, and platelets', 450, '24 hours', labImages.cbcReport, true),
  test('lab-2', 'Lipid Profile', 'Measures cholesterol and triglyceride levels', 650, '24 hours', labImages.lipidReport, true),
  test('lab-3', 'Thyroid Panel (TSH, T3, T4)', 'Complete thyroid hormone screening', 800, '48 hours', labImages.thyroidReport, true),
  test('lab-4', 'HbA1c (Glycated Hemoglobin)', '3-month average blood sugar test', 550, '24 hours', labImages.hba1cReport, true),
  test('lab-5', 'Liver Function Test (LFT)', 'Checks liver enzymes and protein levels', 700, '24 hours', labImages.lft),
  test('lab-6', 'Kidney Function Test (KFT)', 'Measures creatinine, BUN, and uric acid', 650, '24 hours', labImages.kft),
  test('lab-7', 'Vitamin D (25-Hydroxy)', 'Detects vitamin D deficiency', 1200, '48 hours', labImages.vitamind),
  test('lab-8', 'Iron Studies Panel', 'Ferritin, serum iron, and TIBC', 900, '24 hours', labImages.iron),
  test('lab-9', 'C-Reactive Protein (CRP)', 'Detects inflammation in the body', 500, '24 hours', labImages.crp),
  test('lab-10', 'Allergy Panel (IgE)', 'Screens common allergen antibodies', 1500, '48 hours', labImages.allergy),
  test('lab-11', 'Urinalysis with Microscopic', 'Urine chemistry with microscopy', 350, '24 hours', labImages.urine),
  test('lab-12', 'Fasting Blood Sugar (FBS)', 'Measures glucose after 8-12 hr fast', 150, '6 hours', labImages.diabetes),
  test('lab-13', 'Post Prandial Blood Sugar (PPBS)', 'Glucose level 2 hours after meal', 150, '6 hours', labImages.ogtt),
  test('lab-14', 'Vitamin B12', 'Detects B12 deficiency causing fatigue', 850, '48 hours', labImages.vitaminb12),
  test('lab-15', 'Calcium & Phosphorus', 'Checks bone mineral levels', 400, '24 hours', labImages.calcium),
  test('lab-16', 'Electrolyte Panel', 'Sodium, potassium, chloride, bicarbonate', 500, '24 hours', labImages.electrolyte),
  test('lab-17', 'ESR (Erythrocyte Sedimentation Rate)', 'Non-specific marker of inflammation', 200, '12 hours', labImages.blood),
  test('lab-18', 'Coagulation Profile (PT/INR)', 'Measures blood clotting time', 600, '24 hours', labImages.coagulation),
  test('lab-19', 'Testosterone Total', 'Measures total testosterone hormone', 750, '48 hours', labImages.testosterone),
  test('lab-20', 'Prolactin', 'Evaluates pituitary gland function', 700, '48 hours', labImages.hormone),
  test('lab-21', 'Stool Routine & Microscopy', 'Detects infections and parasites', 300, '24 hours', labImages.stool),
  test('lab-22', 'ECG (Electrocardiogram)', 'Records heart electrical activity', 500, '1 hour', labImages.ecg),
  test('lab-23', 'PSA (Prostate Specific Antigen)', 'Screens prostate health in men', 900, '48 hours', labImages.psa),
  test('lab-24', 'Beta hCG (Pregnancy Test)', 'Confirms pregnancy and monitors levels', 450, '12 hours', labImages.pregnancy),
  test('lab-25', 'COVID-19 RT-PCR', 'Detects active SARS-CoV-2 infection', 700, '24 hours', labImages.covid),
  test('lab-26', 'Dengue NS1 & IgM/IgG', 'Detects dengue infection and stage', 1100, '24 hours', labImages.dengue),
  test('lab-27', 'Malaria Antigen (Vivax/Falciparum)', 'Rapid malaria parasite detection', 500, '6 hours', labImages.malaria),
  test('lab-28', 'Hepatitis B Surface Antigen (HBsAg)', 'Screens for hepatitis B infection', 650, '24 hours', labImages.hepatitis),
  test('lab-29', 'HIV 1 & 2 Antibody', 'Screens for HIV infection', 800, '24 hours', labImages.hiv),
  test('lab-30', 'Blood Group & Rh Typing', 'Determines ABO and Rh blood group', 250, '6 hours', labImages.bloodGroup),
  test('lab-31', 'Amylase', 'Evaluates pancreatic enzyme activity', 450, '24 hours', labImages.amylase),
  test('lab-32', 'Lipase', 'More specific pancreatic inflammation marker', 500, '24 hours', labImages.lipase),
  test('lab-33', 'Troponin I (High Sensitivity)', 'Detects heart muscle injury', 1400, '6 hours', labImages.troponin),
  test('lab-34', 'BNP / NT-proBNP', 'Assesses heart failure risk', 1600, '24 hours', labImages.bnp),
  test('lab-35', 'ANA (Antinuclear Antibody)', 'Screens autoimmune disorders', 1200, '48 hours', labImages.ana),
  test('lab-36', 'Rheumatoid Factor (RF)', 'Helps diagnose rheumatoid arthritis', 550, '24 hours', labImages.rheumatoid),
  test('lab-37', 'Cortisol (Morning)', 'Evaluates adrenal gland function', 700, '48 hours', labImages.cortisol),
  test('lab-38', 'FSH (Follicle Stimulating Hormone)', 'Assesses fertility and menopause', 750, '48 hours', labImages.fsh),
  test('lab-39', 'LH (Luteinizing Hormone)', 'Evaluates ovulation and fertility', 750, '48 hours', labImages.lh),
  test('lab-40', 'Estradiol (E2)', 'Measures estrogen hormone levels', 850, '48 hours', labImages.estradiol),
  test('lab-41', 'Semen Analysis', 'Evaluates male fertility parameters', 900, '24 hours', labImages.semen),
  test('lab-42', 'Pap Smear', 'Cervical cancer screening cytology', 1000, '72 hours', labImages.pap),
  test('lab-43', 'Abdominal Ultrasound', 'Imaging of liver, kidney, and abdomen', 1200, 'Same day', labImages.ultrasound),
  test('lab-44', 'Chest X-Ray (PA View)', 'Screens lungs and chest structures', 450, '2 hours', labImages.xray),
  test('lab-45', 'CT Scan Brain (Plain)', 'Cross-sectional brain imaging', 3500, 'Same day', labImages.ct),
  test('lab-46', 'MRI Brain (Plain)', 'Detailed soft-tissue brain scan', 6500, '48 hours', labImages.mri),
  test('lab-47', 'Spirometry (PFT)', 'Measures lung function capacity', 800, '1 hour', labImages.spirometry),
  test('lab-48', 'Urine Culture & Sensitivity', 'Identifies UTI bacteria and antibiotics', 700, '48 hours', labImages.culture),
  test('lab-49', 'Widal Test (Typhoid)', 'Screens typhoid fever antibodies', 400, '24 hours', labImages.widal),
  test('lab-50', 'VDRL / RPR (Syphilis)', 'Screens syphilis infection', 350, '24 hours', labImages.vdrl),
]

export const labTestsFooterMock = {
  links: ['About', 'Contact', 'FAQ'],
  copyright: '© Copyright - 2023. All rights reserved.',
}

export const labTestsFooterContentMock = {
  About: {
    title: 'About CareSphere Lab Tests',
    description:
      'CareSphere partners with NABL-accredited labs across Ahmedabad to offer reliable diagnostics with home sample collection or walk-in visits.',
    highlights: [
      '500+ tests across pathology, radiology, and wellness panels',
      'Home collection slots from 6:00 AM to 8:00 PM, 7 days a week',
      'Digital reports delivered to your CareSphere health records',
    ],
  },
  Contact: {
    title: 'Contact lab support',
    phone: '+91 98765 43210',
    email: 'labs@caresphere.in',
    whatsapp: '+91 98765 43210',
    hours: 'Mon–Sat, 8:00 AM – 8:00 PM',
    address: 'CareSphere Diagnostics, SG Highway, Ahmedabad – 380015',
  },
  FAQ: {
    title: 'Frequently asked questions',
    items: [
      { question: 'How do I book a home sample collection?', answer: 'Select a test, tap Book, then complete checkout. Our phlebotomist will call you to confirm the slot within 30 minutes.' },
      { question: 'When will I receive my report?', answer: 'Most reports are ready within 24–48 hours. You will get a notification in CareSphere when your report is uploaded.' },
      { question: 'Do I need to fast before a test?', answer: 'Fasting is required for Lipid Profile and some other panels. Check the instructions sent by SMS after booking.' },
      { question: 'Can I cancel or reschedule a booking?', answer: 'Yes. Call lab support at least 2 hours before your slot to cancel or reschedule without a fee.' },
    ],
  },
}
