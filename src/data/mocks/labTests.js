import { labImages } from './labImages'

export const labTestsMock = [
  { id: 'lab-1', name: 'Complete Blood Count (CBC)', description: 'Checks red cells, white cells, and platelets', price: 450, turnaround: '24 hours', featured: true, thumbnail: labImages.cbcReport, background: labImages.cbcReport },
  { id: 'lab-2', name: 'Lipid Profile', description: 'Measures cholesterol and triglyceride levels', price: 650, turnaround: '24 hours', featured: true, thumbnail: labImages.lipidReport, background: labImages.lipidReport },
  { id: 'lab-3', name: 'Thyroid Panel (TSH, T3, T4)', description: 'Complete thyroid hormone screening', price: 800, turnaround: '48 hours', featured: true, thumbnail: labImages.thyroidReport, background: labImages.thyroidReport },
  { id: 'lab-4', name: 'HbA1c (Glycated Hemoglobin)', description: '3-month average blood sugar test', price: 550, turnaround: '24 hours', featured: true, thumbnail: labImages.hba1cReport, background: labImages.hba1cReport },
  { id: 'lab-5', name: 'Liver Function Test (LFT)', description: 'Checks liver enzymes and protein levels', price: 700, turnaround: '24 hours', thumbnail: labImages.lft, background: labImages.lft },
  { id: 'lab-6', name: 'Kidney Function Test (KFT)', description: 'Measures creatinine, BUN, and uric acid', price: 650, turnaround: '24 hours', thumbnail: labImages.kft, background: labImages.kft },
  { id: 'lab-7', name: 'Vitamin D (25-Hydroxy)', description: 'Detects vitamin D deficiency', price: 1200, turnaround: '48 hours', thumbnail: labImages.vitamind, background: labImages.vitamind },
  { id: 'lab-8', name: 'Iron Studies Panel', description: 'Ferritin, serum iron, and TIBC', price: 900, turnaround: '24 hours', thumbnail: labImages.iron, background: labImages.iron },
  { id: 'lab-9', name: 'C-Reactive Protein (CRP)', description: 'Detects inflammation in the body', price: 500, turnaround: '24 hours', thumbnail: labImages.crp, background: labImages.crp },
  { id: 'lab-10', name: 'Allergy Panel (IgE)', description: 'Screens common allergen antibodies', price: 1500, turnaround: '48 hours', thumbnail: labImages.allergy, background: labImages.allergy },
  { id: 'lab-11', name: 'Urinalysis with Microscopic', description: 'Urine chemistry with microscopy', price: 350, turnaround: '24 hours', thumbnail: labImages.urine, background: labImages.urine },
  { id: 'lab-12', name: 'Fasting Blood Sugar (FBS)', description: 'Measures glucose after 8-12 hr fast', price: 150, turnaround: '6 hours', thumbnail: labImages.diabetes, background: labImages.diabetes },
  { id: 'lab-13', name: 'Post Prandial Blood Sugar (PPBS)', description: 'Glucose level 2 hours after meal', price: 150, turnaround: '6 hours', thumbnail: labImages.diabetes, background: labImages.diabetes },
  { id: 'lab-14', name: 'Vitamin B12', description: 'Detects B12 deficiency causing fatigue', price: 850, turnaround: '48 hours', thumbnail: labImages.vitaminb12, background: labImages.vitaminb12 },
  { id: 'lab-15', name: 'Calcium & Phosphorus', description: 'Checks bone mineral levels', price: 400, turnaround: '24 hours', thumbnail: labImages.calcium, background: labImages.calcium },
  { id: 'lab-16', name: 'Electrolyte Panel', description: 'Sodium, potassium, chloride, bicarbonate', price: 500, turnaround: '24 hours', thumbnail: labImages.electrolyte, background: labImages.electrolyte },
  { id: 'lab-17', name: 'ESR (Erythrocyte Sedimentation Rate)', description: 'Non-specific marker of inflammation', price: 200, turnaround: '12 hours', thumbnail: labImages.blood, background: labImages.blood },
  { id: 'lab-18', name: 'Coagulation Profile (PT/INR)', description: 'Measures blood clotting time', price: 600, turnaround: '24 hours', thumbnail: labImages.coagulation, background: labImages.coagulation },
  { id: 'lab-19', name: 'Testosterone Total', description: 'Measures total testosterone hormone', price: 750, turnaround: '48 hours', thumbnail: labImages.testosterone, background: labImages.testosterone },
  { id: 'lab-20', name: 'Prolactin', description: 'Evaluates pituitary gland function', price: 700, turnaround: '48 hours', thumbnail: labImages.hormone, background: labImages.hormone },
  { id: 'lab-21', name: 'Stool Routine & Microscopy', description: 'Detects infections and parasites', price: 300, turnaround: '24 hours', thumbnail: labImages.stool, background: labImages.stool },
  { id: 'lab-22', name: 'ECG (Electrocardiogram)', description: 'Records heart electrical activity', price: 500, turnaround: '1 hour', thumbnail: labImages.ecg, background: labImages.ecg },
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
