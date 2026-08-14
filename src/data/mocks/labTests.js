import { labImages } from './labImages'

export const labTestsMock = [
  {
    id: 'lab-1',
    name: 'Complete Blood Count',
    description: 'Checks red cells, white cells, and platelets',
    price: 450,
    turnaround: '24 hours',
    featured: true,
    thumbnail: labImages.cbcReport,
    background: labImages.cbcReport,
    reportImage: labImages.cbcReport,
  },
  {
    id: 'lab-2',
    name: 'Lipid Profile',
    description: 'Measures cholesterol and triglyceride levels',
    price: 650,
    turnaround: '24 hours',
    featured: true,
    thumbnail: labImages.lipidReport,
    background: labImages.lipidReport,
    reportImage: labImages.lipidReport,
  },
  {
    id: 'lab-3',
    name: 'Thyroid Panel',
    description: 'TSH, T3, and T4 hormone screening',
    price: 800,
    turnaround: '48 hours',
    featured: true,
    thumbnail: labImages.thyroidReport,
    background: labImages.thyroidReport,
    reportImage: labImages.thyroidReport,
  },
  {
    id: 'lab-4',
    name: 'HbA1c',
    description: '3-month average blood sugar test',
    price: 550,
    turnaround: '24 hours',
    featured: true,
    thumbnail: labImages.hba1cReport,
    background: labImages.hba1cReport,
    reportImage: labImages.hba1cReport,
  },
  {
    id: 'lab-5',
    name: 'Liver Function Test (LFT)',
    description: 'Checks liver enzymes and protein levels',
    price: 700,
    turnaround: '24 hours',
    thumbnail: labImages.lft,
    background: labImages.lft,
    reportImage: labImages.lft,
  },
  {
    id: 'lab-6',
    name: 'Kidney Function Test (KFT)',
    description: 'Measures kidney function and creatinine',
    price: 650,
    turnaround: '24 hours',
    thumbnail: labImages.kft,
    background: labImages.kft,
    reportImage: labImages.kft,
  },
  {
    id: 'lab-7',
    name: 'Vitamin D (25-Hydroxy)',
    description: 'Assesses vitamin D deficiency',
    price: 1200,
    turnaround: '48 hours',
    thumbnail: labImages.vitamind,
    background: labImages.vitamind,
    reportImage: labImages.vitamind,
  },
  {
    id: 'lab-8',
    name: 'Iron Studies Panel',
    description: 'Ferritin, iron, and TIBC',
    price: 900,
    turnaround: '24 hours',
    thumbnail: labImages.iron,
    background: labImages.iron,
    reportImage: labImages.iron,
  },
  {
    id: 'lab-9',
    name: 'C-Reactive Protein (CRP)',
    description: 'Detects inflammation in the body',
    price: 500,
    turnaround: '24 hours',
    thumbnail: labImages.crp,
    background: labImages.crp,
    reportImage: labImages.crp,
  },
  {
    id: 'lab-10',
    name: 'Allergy Panel (IgE)',
    description: 'Screens common allergen antibodies',
    price: 1500,
    turnaround: '48 hours',
    thumbnail: labImages.allergy,
    background: labImages.allergy,
    reportImage: labImages.allergy,
  },
  {
    id: 'lab-11',
    name: 'Urinalysis with Microscopic',
    description: 'Urine chemistry with microscopy',
    price: 350,
    turnaround: '24 hours',
    thumbnail: labImages.urine,
    background: labImages.urine,
    reportImage: labImages.urine,
  },
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
      {
        question: 'How do I book a home sample collection?',
        answer:
          'Select a test, tap Book, then complete checkout. Our phlebotomist will call you to confirm the slot within 30 minutes.',
      },
      {
        question: 'When will I receive my report?',
        answer:
          'Most reports are ready within 24–48 hours. You will get a notification in CareSphere when your report is uploaded.',
      },
      {
        question: 'Do I need to fast before a test?',
        answer:
          'Fasting is required for Lipid Profile and some other panels. Check the instructions sent by SMS after booking.',
      },
      {
        question: 'Can I cancel or reschedule a booking?',
        answer:
          'Yes. Call lab support at least 2 hours before your slot to cancel or reschedule without a fee.',
      },
    ],
  },
}
