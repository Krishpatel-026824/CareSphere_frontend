export const pharmacyItemsMock = [
  {
    id: 'med-1',
    name: 'Metformin 500mg',
    subtitle: 'Diabetes • 30 tablets',
    price: 120,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&w=160&h=160&fit=crop',
  },
  {
    id: 'med-2',
    name: 'Atorvastatin 10mg',
    subtitle: 'Cholesterol • 15 tablets',
    price: 185,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&w=160&h=160&fit=crop',
  },
  {
    id: 'med-3',
    name: 'Vitamin D3 60K',
    subtitle: 'Supplement • 4 capsules',
    price: 95,
    inStock: true,
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&w=160&h=160&fit=crop',
  },
  {
    id: 'med-4',
    name: 'Cetirizine 10mg',
    subtitle: 'Allergy • 10 tablets',
    price: 45,
    inStock: false,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&w=160&h=160&fit=crop',
  },
]

export const labTestsMock = [
  {
    id: 'lab-1',
    name: 'Complete Blood Count',
    description: 'Checks red cells, white cells, and platelets',
    price: 450,
    turnaround: '24 hours',
  },
  {
    id: 'lab-2',
    name: 'Lipid Profile',
    description: 'Measures cholesterol and triglyceride levels',
    price: 650,
    turnaround: '24 hours',
  },
  {
    id: 'lab-3',
    name: 'Thyroid Panel',
    description: 'TSH, T3, and T4 hormone screening',
    price: 800,
    turnaround: '48 hours',
  },
  {
    id: 'lab-4',
    name: 'HbA1c',
    description: '3-month average blood sugar test',
    price: 550,
    turnaround: '24 hours',
  },
]

export const healthRecordsMock = [
  {
    id: 'rec-1',
    title: 'ECG Report',
    doctorName: 'Dr. Rohan Mehta',
    dateLabel: '12 May 2025',
    type: 'Cardiology',
  },
  {
    id: 'rec-2',
    title: 'Skin Allergy Panel',
    doctorName: 'Dr. Kavya Shah',
    dateLabel: '28 Apr 2025',
    type: 'Dermatology',
  },
  {
    id: 'rec-3',
    title: 'Annual Health Checkup',
    doctorName: 'Dr. Meera Desai',
    dateLabel: '15 Mar 2025',
    type: 'General',
  },
  {
    id: 'rec-4',
    title: 'Prescription History',
    doctorName: 'CareSphere Pharmacy',
    dateLabel: '02 Jun 2025',
    type: 'Pharmacy',
  },
]
