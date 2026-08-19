import { X, Clock, IndianRupee, FlaskConical, AlertTriangle, Thermometer } from 'lucide-react'
import { Dialog, DialogContent } from '@mui/material'

const testDetails = {
  'lab-1': { includes: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'Hematocrit', 'MCV', 'MCH', 'MCHC'], preparation: 'No fasting required', sampleType: 'Blood (EDTA tube)', uses: 'Diagnose anemia, infections, blood disorders' },
  'lab-2': { includes: ['Total Cholesterol', 'LDL', 'HDL', 'Triglycerides', 'VLDL'], preparation: '10-12 hours fasting required', sampleType: 'Blood (Serum)', uses: 'Assess cardiovascular risk' },
  'lab-3': { includes: ['TSH', 'Free T3', 'Free T4'], preparation: 'No fasting required. Take sample before thyroid medication', sampleType: 'Blood (Serum)', uses: 'Detect hypothyroidism or hyperthyroidism' },
  'lab-4': { includes: ['Glycated Hemoglobin (HbA1c)'], preparation: 'No fasting required', sampleType: 'Blood (EDTA tube)', uses: 'Monitor long-term blood sugar control in diabetes' },
  'lab-5': { includes: ['ALT (SGPT)', 'AST (SGOT)', 'Bilirubin Total/Direct', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'GGT'], preparation: '8-10 hours fasting recommended', sampleType: 'Blood (Serum)', uses: 'Assess liver health and detect liver diseases' },
  'lab-6': { includes: ['Creatinine', 'BUN', 'Uric Acid', 'eGFR', 'Electrolytes'], preparation: 'No special preparation', sampleType: 'Blood (Serum)', uses: 'Evaluate kidney function' },
  'lab-7': { includes: ['Vitamin D (25-OH)'], preparation: 'No fasting required', sampleType: 'Blood (Serum)', uses: 'Detect vitamin D deficiency causing bone weakness and fatigue' },
  'lab-8': { includes: ['Serum Iron', 'Ferritin', 'TIBC', 'Transferrin Saturation'], preparation: 'Morning sample preferred, 8-hour fast', sampleType: 'Blood (Serum)', uses: 'Diagnose iron deficiency anemia' },
  'lab-9': { includes: ['C-Reactive Protein (Quantitative)'], preparation: 'No fasting required', sampleType: 'Blood (Serum)', uses: 'Detect acute inflammation, infection, or autoimmune activity' },
  'lab-10': { includes: ['Total IgE', 'Specific IgE Panel'], preparation: 'No fasting required', sampleType: 'Blood (Serum)', uses: 'Identify allergic sensitization to common allergens' },
  'lab-11': { includes: ['pH', 'Specific Gravity', 'Protein', 'Glucose', 'RBC', 'WBC', 'Casts', 'Crystals'], preparation: 'Mid-stream clean-catch sample', sampleType: 'Urine', uses: 'Detect UTI, kidney disease, diabetes' },
  'lab-12': { includes: ['Fasting Blood Glucose'], preparation: '10-12 hours fasting required', sampleType: 'Blood (Fluoride tube)', uses: 'Screen for diabetes and prediabetes' },
  'lab-13': { includes: ['Post Prandial Blood Glucose'], preparation: 'Sample taken 2 hours after meal', sampleType: 'Blood (Fluoride tube)', uses: 'Monitor glucose tolerance after eating' },
  'lab-14': { includes: ['Vitamin B12 (Cyanocobalamin)'], preparation: 'No fasting required', sampleType: 'Blood (Serum)', uses: 'Detect B12 deficiency causing fatigue, numbness, and anemia' },
  'lab-15': { includes: ['Serum Calcium', 'Serum Phosphorus'], preparation: 'No special preparation', sampleType: 'Blood (Serum)', uses: 'Evaluate bone health and parathyroid function' },
  'lab-16': { includes: ['Sodium', 'Potassium', 'Chloride', 'Bicarbonate'], preparation: 'No fasting required', sampleType: 'Blood (Serum)', uses: 'Monitor fluid balance, kidney function, and acid-base status' },
  'lab-17': { includes: ['ESR (Westergren method)'], preparation: 'No fasting required', sampleType: 'Blood (EDTA tube)', uses: 'Non-specific marker for inflammation and infection' },
  'lab-18': { includes: ['Prothrombin Time (PT)', 'INR', 'aPTT'], preparation: 'No fasting. Inform about blood thinners', sampleType: 'Blood (Citrate tube)', uses: 'Assess blood clotting and monitor anticoagulant therapy' },
  'lab-19': { includes: ['Total Testosterone'], preparation: 'Early morning sample (before 10 AM)', sampleType: 'Blood (Serum)', uses: 'Evaluate hormonal issues, infertility, and PCOS' },
  'lab-20': { includes: ['Serum Prolactin'], preparation: 'Sample 3 hours after waking, avoid stress', sampleType: 'Blood (Serum)', uses: 'Evaluate pituitary disorders and irregular periods' },
  'lab-21': { includes: ['Consistency', 'Color', 'Occult Blood', 'Ova & Parasites', 'WBC', 'Reducing Substances'], preparation: 'Fresh sample within 30 minutes', sampleType: 'Stool', uses: 'Detect GI infections, parasites, and bleeding' },
  'lab-22': { includes: ['12-lead ECG recording', 'Heart Rate', 'Rhythm Analysis'], preparation: 'Avoid caffeine 2 hours before', sampleType: 'Non-invasive (chest electrodes)', uses: 'Detect arrhythmias, heart attacks, and cardiac abnormalities' },
}

const defaultDetail = { includes: ['Multiple parameters'], preparation: 'Consult lab for preparation', sampleType: 'Blood', uses: 'General health assessment' }

export default function LabTestDetailModal({ open, onClose, test }) {
  if (!test) return null
  const info = testDetails[test.id] || defaultDetail

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer z-10">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center shrink-0">
              <FlaskConical className="w-6 h-6 text-teal" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-navy">{test.name}</h2>
              <p className="text-[13px] text-gray-500">{test.description}</p>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-navy bg-gray-50 px-3 py-1.5 rounded-lg">
              <IndianRupee className="w-3.5 h-3.5 text-teal" />₹{test.price}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold text-navy bg-gray-50 px-3 py-1.5 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-teal" />Results in {test.turnaround}
            </div>
          </div>

          <div className="space-y-3.5">
            <Section title="Test Includes" icon={<FlaskConical className="w-4 h-4 text-teal" />}>
              <div className="flex flex-wrap gap-1.5">
                {info.includes.map((p) => (
                  <span key={p} className="text-[12px] bg-teal/10 text-teal-dark font-medium px-2.5 py-1 rounded-md">{p}</span>
                ))}
              </div>
            </Section>

            <Section title="Sample Type" icon={<Thermometer className="w-4 h-4 text-teal" />}>
              <p className="text-[13px] text-gray-700">{info.sampleType}</p>
            </Section>

            <Section title="Preparation" icon={<AlertTriangle className="w-4 h-4 text-amber-500" />}>
              <p className="text-[13px] text-gray-700">{info.preparation}</p>
            </Section>

            <Section title="Used For" icon={<FlaskConical className="w-4 h-4 text-teal" />}>
              <p className="text-[13px] text-gray-700">{info.uses}</p>
            </Section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Section({ title, icon, children }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-[13px] font-semibold text-navy">{title}</span>
      </div>
      {children}
    </div>
  )
}
