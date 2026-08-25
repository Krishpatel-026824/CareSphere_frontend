import { X, Pill, AlertCircle, Clock, Shield, Package } from 'lucide-react'
import { Dialog, DialogContent } from '@mui/material'

const medicineInfo = {
  'Dolo 650mg': { salt: 'Paracetamol 650mg', manufacturer: 'Micro Labs Ltd', use: 'Fever, headache, body pain', sideEffects: 'Nausea, allergic rash (rare)', dosage: '1 tablet every 4-6 hours, max 4/day', storage: 'Store below 30°C', warning: 'Avoid alcohol. Do not exceed recommended dose.' },
  'Paracetamol 500mg': { salt: 'Paracetamol 500mg', manufacturer: 'Cipla Ltd', use: 'Mild to moderate pain, fever', sideEffects: 'Rare: skin rash, nausea', dosage: '1-2 tablets every 4-6 hours', storage: 'Store below 25°C in dry place', warning: 'Do not take with other paracetamol products.' },
  'Crocin Advance 500mg': { salt: 'Paracetamol 500mg', manufacturer: 'GSK', use: 'Fever, body pain, headache', sideEffects: 'Rare allergic reactions', dosage: '1-2 tablets every 4-6 hours', storage: 'Store below 30°C', warning: 'Consult doctor if symptoms persist beyond 3 days.' },
  'Combiflam': { salt: 'Ibuprofen 400mg + Paracetamol 325mg', manufacturer: 'Sanofi India', use: 'Pain, inflammation, fever', sideEffects: 'Stomach upset, dizziness', dosage: '1 tablet 3 times a day after food', storage: 'Store below 30°C', warning: 'Take with food. Avoid in kidney disease.' },
  'Saridon': { salt: 'Paracetamol + Propyphenazone + Caffeine', manufacturer: 'Bayer', use: 'Headache, toothache, body pain', sideEffects: 'Dizziness, nausea', dosage: '1-2 tablets as needed, max 6/day', storage: 'Store in cool dry place', warning: 'Not for children under 12.' },
  'Disprin': { salt: 'Aspirin 350mg', manufacturer: 'Reckitt', use: 'Headache, fever, mild pain', sideEffects: 'Stomach irritation, bleeding risk', dosage: 'Dissolve 1-2 tablets in water', storage: 'Store below 25°C', warning: 'Avoid on empty stomach. Not for children.' },
  'Ibuprofen 200mg': { salt: 'Ibuprofen 200mg', manufacturer: 'Cipla', use: 'Pain, inflammation, arthritis', sideEffects: 'Stomach pain, headache', dosage: '1-2 tablets 3 times daily after food', storage: 'Store below 30°C', warning: 'Take after meals. Avoid in kidney issues.' },
  'Cetirizine 10mg': { salt: 'Cetirizine Hydrochloride 10mg', manufacturer: 'Dr Reddy\'s', use: 'Allergy, sneezing, runny nose, hives', sideEffects: 'Drowsiness, dry mouth', dosage: '1 tablet once daily', storage: 'Store below 25°C', warning: 'May cause drowsiness. Avoid driving.' },
  'Levocetirizine 5mg': { salt: 'Levocetirizine 5mg', manufacturer: 'Sun Pharma', use: 'Allergic rhinitis, urticaria', sideEffects: 'Mild drowsiness, fatigue', dosage: '1 tablet once daily in evening', storage: 'Store below 30°C', warning: 'Less sedating than cetirizine.' },
  'Allegra 120mg': { salt: 'Fexofenadine 120mg', manufacturer: 'Sanofi', use: 'Seasonal allergy, sneezing, itching', sideEffects: 'Headache, nausea (rare)', dosage: '1 tablet once daily', storage: 'Store below 25°C', warning: 'Non-drowsy antihistamine.' },
  'Montelukast 10mg': { salt: 'Montelukast Sodium 10mg', manufacturer: 'Sun Pharma', use: 'Asthma, allergic rhinitis', sideEffects: 'Headache, stomach pain', dosage: '1 tablet at bedtime', storage: 'Store below 30°C', warning: 'Not for acute asthma attacks.' },
  'Amoxicillin 500mg': { salt: 'Amoxicillin 500mg', manufacturer: 'Cipla', use: 'Bacterial infections (throat, ear, chest)', sideEffects: 'Diarrhea, rash, nausea', dosage: '1 capsule 3 times daily for 5-7 days', storage: 'Store below 25°C', warning: 'Complete full course. Take with food.' },
  'Azithromycin 500mg': { salt: 'Azithromycin 500mg', manufacturer: 'Alkem', use: 'Respiratory, skin, ear infections', sideEffects: 'Nausea, diarrhea, stomach pain', dosage: '1 tablet daily for 3 days', storage: 'Store below 30°C', warning: 'Take 1 hour before or 2 hours after food.' },
  'Metformin 500mg': { salt: 'Metformin HCl 500mg', manufacturer: 'USV', use: 'Type 2 diabetes blood sugar control', sideEffects: 'Nausea, diarrhea, metallic taste', dosage: '1 tablet twice daily with meals', storage: 'Store below 30°C', warning: 'Take with food to reduce stomach upset.' },
  'Glycomet GP 1mg': { salt: 'Glimepiride 1mg + Metformin 500mg', manufacturer: 'USV', use: 'Type 2 diabetes', sideEffects: 'Low blood sugar, nausea', dosage: '1 tablet with breakfast', storage: 'Store below 25°C', warning: 'Monitor blood sugar regularly.' },
  'Metformin 1000mg': { salt: 'Metformin HCl 1000mg', manufacturer: 'USV', use: 'Type 2 diabetes (higher dose)', sideEffects: 'Stomach upset, lactic acidosis (rare)', dosage: '1 tablet twice daily with meals', storage: 'Store below 30°C', warning: 'Not for kidney impairment patients.' },
  'Omeprazole 20mg': { salt: 'Omeprazole 20mg', manufacturer: 'Dr Reddy\'s', use: 'Acidity, GERD, ulcers', sideEffects: 'Headache, nausea, diarrhea', dosage: '1 capsule before breakfast', storage: 'Store below 25°C', warning: 'Take 30 min before food on empty stomach.' },
  'Pantoprazole 40mg': { salt: 'Pantoprazole 40mg', manufacturer: 'Alkem', use: 'Acid reflux, peptic ulcer', sideEffects: 'Headache, flatulence', dosage: '1 tablet before breakfast', storage: 'Store below 30°C', warning: 'Take on empty stomach.' },
  'Pan-D': { salt: 'Pantoprazole 40mg + Domperidone 30mg', manufacturer: 'Alkem', use: 'Acidity with nausea/bloating', sideEffects: 'Dry mouth, headache', dosage: '1 capsule before breakfast', storage: 'Store below 25°C', warning: 'Take 30-60 min before meals.' },
  'Atorvastatin 10mg': { salt: 'Atorvastatin 10mg', manufacturer: 'Pfizer', use: 'High cholesterol, heart disease prevention', sideEffects: 'Muscle pain, fatigue', dosage: '1 tablet at bedtime', storage: 'Store below 30°C', warning: 'Report unexplained muscle pain to doctor.' },
  'Losartan 50mg': { salt: 'Losartan Potassium 50mg', manufacturer: 'Torrent', use: 'High blood pressure', sideEffects: 'Dizziness, fatigue', dosage: '1 tablet once daily', storage: 'Store below 30°C', warning: 'Avoid in pregnancy. Monitor kidney function.' },
  'Amlodipine 5mg': { salt: 'Amlodipine 5mg', manufacturer: 'Pfizer', use: 'High blood pressure, angina', sideEffects: 'Ankle swelling, headache', dosage: '1 tablet once daily', storage: 'Store below 30°C', warning: 'Do not stop suddenly.' },
  'Vitamin D3 60K': { salt: 'Cholecalciferol 60000 IU', manufacturer: 'USV', use: 'Vitamin D deficiency, bone health', sideEffects: 'Rare at normal doses', dosage: '1 capsule per week for 8 weeks', storage: 'Store below 25°C', warning: 'Take with fatty food for better absorption.' },
  'Vitamin C 500mg': { salt: 'Ascorbic Acid 500mg', manufacturer: 'Limcee', use: 'Immunity, skin health, antioxidant', sideEffects: 'Stomach upset at high doses', dosage: '1 tablet daily', storage: 'Store in cool dry place', warning: 'Safe for daily use.' },
  'Ecosprin 75mg': { salt: 'Aspirin 75mg', manufacturer: 'USV', use: 'Blood thinner, heart attack prevention', sideEffects: 'Stomach irritation, bruising', dosage: '1 tablet daily after food', storage: 'Store below 30°C', warning: 'Take after meals. Avoid before surgery.' },
  'Thyronorm 50mcg': { salt: 'Levothyroxine 50mcg', manufacturer: 'Abbott', use: 'Hypothyroidism (low thyroid)', sideEffects: 'Palpitations, weight loss (if overdosed)', dosage: '1 tablet on empty stomach, 30 min before breakfast', storage: 'Store below 25°C', warning: 'Take on empty stomach. Regular thyroid tests needed.' },
  'Ranitidine 150mg': { salt: 'Ranitidine 150mg', manufacturer: 'GSK', use: 'Stomach ulcer, acidity, heartburn', sideEffects: 'Headache, dizziness, constipation', dosage: '1 tablet twice daily before meals', storage: 'Store below 30°C', warning: 'Not recommended for long-term use without doctor advice.' },
  'Digene': { salt: 'Aluminium Hydroxide + Magnesium Hydroxide + Simethicone', manufacturer: 'Abbott', use: 'Acidity, gas, bloating, indigestion', sideEffects: 'Constipation, diarrhea (rare)', dosage: '1-2 teaspoons after meals', storage: 'Store below 30°C', warning: 'Shake well before use. Not for prolonged use.' },
  'Eno Fruit Salt': { salt: 'Sodium Bicarbonate + Citric Acid', manufacturer: 'GSK', use: 'Quick acidity & heartburn relief', sideEffects: 'Belching, flatulence', dosage: '1 sachet dissolved in water as needed', storage: 'Store in cool dry place', warning: 'Not for regular use. High sodium content.' },
  'Domperidone 10mg': { salt: 'Domperidone 10mg', manufacturer: 'Torrent', use: 'Nausea, vomiting, bloating', sideEffects: 'Dry mouth, headache', dosage: '1 tablet 3 times daily before meals', storage: 'Store below 30°C', warning: 'Take 15-30 min before food. Avoid in heart conditions.' },
  'Ondansetron 4mg': { salt: 'Ondansetron 4mg', manufacturer: 'Sun Pharma', use: 'Severe nausea & vomiting (chemo, surgery)', sideEffects: 'Headache, constipation', dosage: '1 tablet 30 min before meals, max 3/day', storage: 'Store below 25°C', warning: 'Prescription only. Not for routine nausea.' },
  'Telma 40mg': { salt: 'Telmisartan 40mg', manufacturer: 'Glenmark', use: 'High blood pressure, heart protection', sideEffects: 'Dizziness, back pain, diarrhea', dosage: '1 tablet once daily', storage: 'Store below 30°C', warning: 'Avoid in pregnancy. Do not stop abruptly.' },
  'Lisinopril 10mg': { salt: 'Lisinopril 10mg', manufacturer: 'Zydus', use: 'High blood pressure, heart failure', sideEffects: 'Dry cough, dizziness', dosage: '1 tablet once daily', storage: 'Store below 30°C', warning: 'May cause persistent dry cough. Avoid in pregnancy.' },
  'Prednisone 10mg': { salt: 'Prednisolone 10mg', manufacturer: 'Cipla', use: 'Inflammation, asthma, allergies, arthritis', sideEffects: 'Weight gain, mood changes, high sugar', dosage: 'As prescribed, usually with food', storage: 'Store below 25°C', warning: 'Do not stop suddenly. Taper dose as directed.' },
  'Shelcal 500mg': { salt: 'Calcium Carbonate 500mg + Vitamin D3 250 IU', manufacturer: 'Torrent', use: 'Calcium & Vitamin D deficiency, bone health', sideEffects: 'Constipation, gas (rare)', dosage: '1 tablet twice daily after meals', storage: 'Store below 30°C', warning: 'Take after food for better absorption.' },
  'Calcium + Vitamin D3': { salt: 'Calcium 500mg + Vitamin D3 400 IU', manufacturer: 'USV', use: 'Bone strengthening, osteoporosis prevention', sideEffects: 'Constipation, bloating', dosage: '1 tablet daily after meals', storage: 'Store below 30°C', warning: 'Do not exceed 2 tablets/day. Take with food.' },
  'Iron + Folic Acid': { salt: 'Ferrous Fumarate 150mg + Folic Acid 0.5mg', manufacturer: 'Alkem', use: 'Iron deficiency anemia, pregnancy support', sideEffects: 'Black stools, nausea, constipation', dosage: '1 tablet daily after meals', storage: 'Store below 30°C', warning: 'Take with vitamin C for better absorption. May cause dark stools.' },
  'Zincovit': { salt: 'Zinc + Multivitamins + Minerals', manufacturer: 'Apex', use: 'Nutritional deficiency, immunity boost', sideEffects: 'Nausea (rare)', dosage: '1 tablet daily after meals', storage: 'Store in cool dry place', warning: 'Do not exceed recommended dose.' },
  'Becosules': { salt: 'Vitamin B-Complex + Vitamin C', manufacturer: 'Pfizer', use: 'Vitamin B deficiency, mouth ulcers, fatigue', sideEffects: 'Bright yellow urine (harmless)', dosage: '1 capsule daily', storage: 'Store below 30°C', warning: 'Safe for daily use. Yellow urine is normal.' },
  'Multivitamin Tablets': { salt: 'Vitamins A, B, C, D, E + Minerals', manufacturer: 'Abbott', use: 'Daily nutritional supplement, energy', sideEffects: 'Nausea if taken on empty stomach', dosage: '1 tablet daily with breakfast', storage: 'Store in cool dry place', warning: 'Take with food. Not a substitute for balanced diet.' },
  'Benadryl Cough Syrup': { salt: 'Diphenhydramine + Ammonium Chloride + Menthol', manufacturer: 'Johnson & Johnson', use: 'Dry & wet cough, throat irritation', sideEffects: 'Drowsiness, dry mouth', dosage: '10ml 3 times daily', storage: 'Store below 25°C', warning: 'Causes drowsiness. Avoid driving after use.' },
  'Cough Syrup (Honey)': { salt: 'Honey + Tulsi + Mulethi extract', manufacturer: 'Dabur', use: 'Dry cough, sore throat, cold relief', sideEffects: 'None known', dosage: '10ml 2-3 times daily', storage: 'Store in cool dry place', warning: 'Natural remedy. Consult doctor if cough persists.' },
  'Ascoril LS Syrup': { salt: 'Levosalbutamol + Ambroxol + Guaifenesin', manufacturer: 'Glenmark', use: 'Wet cough, chest congestion, bronchitis', sideEffects: 'Nausea, dizziness, tremor (rare)', dosage: '10ml 2-3 times daily', storage: 'Store below 30°C', warning: 'Shake well before use. Consult doctor for children under 2.' },
  'Alex Cough Syrup': { salt: 'Dextromethorphan + Chlorpheniramine + Phenylephrine', manufacturer: 'Glenmark', use: 'Dry cough, cold, nasal congestion', sideEffects: 'Drowsiness, dry mouth', dosage: '10ml 3 times daily', storage: 'Store below 25°C', warning: 'May cause drowsiness. Avoid alcohol.' },
  'Calpol 250 Suspension': { salt: 'Paracetamol 250mg/5ml', manufacturer: 'GSK', use: 'Fever and mild pain in children', sideEffects: 'Rare allergic rash', dosage: 'As per age/weight on label, every 4-6 hours', storage: 'Store below 25°C', warning: 'Shake well. Do not exceed 4 doses in 24 hours.' },
  'Crocin Syrup': { salt: 'Paracetamol 120mg/5ml', manufacturer: 'GSK', use: 'Fever, body pain, headache in kids', sideEffects: 'Rare nausea or rash', dosage: '5-10ml every 4-6 hours as needed', storage: 'Store below 30°C', warning: 'Do not combine with other paracetamol products.' },
  'Meftal-P Suspension': { salt: 'Mefenamic Acid 100mg/5ml', manufacturer: 'Blue Cross', use: 'Fever, pain, and inflammation in children', sideEffects: 'Stomach upset, diarrhea', dosage: 'As directed by doctor based on weight', storage: 'Store below 25°C', warning: 'Give after food. Prescription preferred for young children.' },
  'Asthalin Syrup': { salt: 'Salbutamol 2mg/5ml', manufacturer: 'Cipla', use: 'Asthma, wheezing, bronchospasm', sideEffects: 'Tremor, palpitations, restlessness', dosage: '5-10ml 3-4 times daily or as prescribed', storage: 'Store below 30°C', warning: 'Not for sudden severe asthma attacks alone. Follow doctor advice.' },
  'Cetirizine Syrup': { salt: 'Cetirizine Hydrochloride 5mg/5ml', manufacturer: 'Dr Reddy\'s', use: 'Allergy, sneezing, runny nose, hives', sideEffects: 'Mild drowsiness, dry mouth', dosage: '5-10ml once daily', storage: 'Store below 25°C', warning: 'May cause drowsiness. Shake well before use.' },
  'Zincovit Syrup': { salt: 'Zinc + Multivitamins + Minerals', manufacturer: 'Apex', use: 'Nutritional support, immunity, growth', sideEffects: 'Mild nausea if taken empty stomach', dosage: '5-10ml once daily after meals', storage: 'Store in cool dry place', warning: 'Shake well. Do not exceed recommended dose.' },
  'Honitus Syrup': { salt: 'Tulsi + Mulethi + Banaphsa extracts', manufacturer: 'Dabur', use: 'Dry & productive cough, throat irritation', sideEffects: 'Generally well tolerated', dosage: '2 teaspoons 3-4 times daily', storage: 'Store in cool dry place', warning: 'Herbal formula. See a doctor if cough lasts more than a week.' },
  'Ambrolite-D Syrup': { salt: 'Ambroxol + Dextromethorphan + Chlorpheniramine', manufacturer: 'Tablets India', use: 'Cough, cold, throat irritation', sideEffects: 'Drowsiness, dryness of mouth', dosage: '10ml 2-3 times daily', storage: 'Store below 25°C', warning: 'Shake well. Avoid driving if drowsy.' },
  'Strepsils': { salt: 'Amylmetacresol + Dichlorobenzyl alcohol', manufacturer: 'Reckitt', use: 'Sore throat, throat infection', sideEffects: 'Mild tongue numbness (temporary)', dosage: '1 lozenge every 2-3 hours, max 12/day', storage: 'Store below 30°C', warning: 'Not for children under 6 years.' },
  'Otrivin Nasal Drops': { salt: 'Xylometazoline 0.1%', manufacturer: 'Novartis', use: 'Nasal congestion, blocked nose, sinusitis', sideEffects: 'Sneezing, dryness, burning sensation', dosage: '2-3 drops in each nostril, 2-3 times daily', storage: 'Store below 25°C', warning: 'Do not use for more than 7 consecutive days.' },
  'Vicks VapoRub': { salt: 'Camphor + Menthol + Eucalyptus oil', manufacturer: 'P&G', use: 'Cold, cough, nasal congestion, body aches', sideEffects: 'Skin irritation (rare)', dosage: 'Apply on chest, throat, and back as needed', storage: 'Store below 30°C', warning: 'External use only. Keep away from eyes and mouth.' },
  'Betadine': { salt: 'Povidone-Iodine 5%', manufacturer: 'Win-Medicare', use: 'Wound antiseptic, infection prevention', sideEffects: 'Skin staining, irritation (rare)', dosage: 'Apply on wounds 2-3 times daily', storage: 'Store below 25°C, away from light', warning: 'External use only. Avoid on deep puncture wounds.' },
  'Volini Spray': { salt: 'Diclofenac Diethylamine 1.16%', manufacturer: 'Sun Pharma', use: 'Muscle pain, joint pain, sprains, backache', sideEffects: 'Skin redness, itching (rare)', dosage: 'Spray on affected area 3-4 times daily', storage: 'Store below 30°C', warning: 'External use only. Do not apply on broken skin.' },
  'Moov Cream': { salt: 'Diclofenac + Methyl Salicylate + Menthol', manufacturer: 'Reckitt', use: 'Back pain, muscle stiffness, sprains', sideEffects: 'Mild burning, skin redness', dosage: 'Apply and massage on affected area 3 times daily', storage: 'Store in cool place', warning: 'External use only. Wash hands after application.' },
  'Burnol Cream': { salt: 'Aminacrine HCl + Cetrimide', manufacturer: 'Dr Morepen', use: 'Minor burns, cuts, wounds', sideEffects: 'Mild stinging on application', dosage: 'Apply thin layer on affected area 2-3 times daily', storage: 'Store below 30°C', warning: 'For external use only. Not for deep or severe burns.' },
  'ORS Powder': { salt: 'Sodium Chloride + Potassium Chloride + Glucose + Sodium Citrate', manufacturer: 'WHO formula', use: 'Dehydration from diarrhea, vomiting, heat stroke', sideEffects: 'None at recommended dose', dosage: 'Dissolve 1 sachet in 1 litre water, sip frequently', storage: 'Store in dry place', warning: 'Use within 24 hours of preparation. Discard leftover.' },
  'Refresh Tears': { salt: 'Carboxymethylcellulose 0.5%', manufacturer: 'Allergan', use: 'Dry eyes, eye irritation, lubrication', sideEffects: 'Temporary blurring (brief)', dosage: '1-2 drops in each eye as needed', storage: 'Store below 25°C', warning: 'Do not touch dropper tip to any surface. Discard 30 days after opening.' },
  'Dabur Honey': { salt: '100% Natural Honey', manufacturer: 'Dabur', use: 'Immunity, cough relief, weight management, energy', sideEffects: 'None (natural product)', dosage: '1-2 teaspoons daily with warm water', storage: 'Store in cool dry place', warning: 'Not for infants under 1 year. Check for adulteration.' },
  'Fabiflu 200mg': { salt: 'Favipiravir 200mg', manufacturer: 'Glenmark', use: 'COVID-19 treatment (mild to moderate)', sideEffects: 'Nausea, diarrhea, elevated uric acid', dosage: 'As prescribed by doctor (usually 1800mg Day 1, then 800mg/day)', storage: 'Store below 30°C', warning: 'Prescription only. Not for pregnant women. Monitor liver function.' },
  'Paracetamol 100mg': { salt: 'Paracetamol 100mg', manufacturer: 'GSK', use: 'Mild pain & fever (lower dose)', sideEffects: 'Rare at recommended dose', dosage: '1-2 tablets every 4-6 hours as needed', storage: 'Store below 30°C', warning: 'Suitable for mild symptoms. Do not combine with other paracetamol products.' },
  'Electral Powder': { salt: 'Sodium Chloride + Potassium Chloride + Dextrose + Sodium Citrate', manufacturer: 'FDC', use: 'Oral rehydration, dehydration from diarrhea', sideEffects: 'None at recommended dose', dosage: 'Dissolve 1 sachet in 1 litre water', storage: 'Store in dry place', warning: 'Prepare fresh solution daily. Do not boil after mixing.' },
}

function getInfo(name) {
  return medicineInfo[name] || { salt: name, manufacturer: 'Pharma Company', use: 'As prescribed by doctor', sideEffects: 'Consult doctor for details', dosage: 'As directed by physician', storage: 'Store in cool dry place below 30°C', warning: 'Read label before use. Keep away from children.' }
}

export default function MedicineDetailModal({ open, onClose, item }) {
  if (!item) return null
  const info = getInfo(item.name)

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer z-10">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-5 pb-2 flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <Pill className="w-7 h-7 text-orange-400" strokeWidth={1.5} />
            )}
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-navy">{item.name}</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">{info.salt}</p>
            <p className="text-[12px] text-gray-400">{info.manufacturer}</p>
          </div>
        </div>

        <div className="px-5 pb-5 mt-3 flex flex-col gap-3">
          <InfoRow icon={Shield} label="Uses" value={info.use} color="text-teal" />
          <InfoRow icon={Clock} label="Dosage" value={info.dosage} color="text-blue-500" />
          <InfoRow icon={AlertCircle} label="Side Effects" value={info.sideEffects} color="text-amber-500" />
          <InfoRow icon={Package} label="Storage" value={info.storage} color="text-purple-500" />

          <div className="mt-1 rounded-xl bg-red-50 border border-red-100 px-3.5 py-2.5">
            <p className="text-[12px] font-semibold text-red-600 mb-0.5">⚠️ Warning</p>
            <p className="text-[12px] text-red-700 leading-relaxed">{info.warning}</p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} strokeWidth={2} />
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-[13px] text-navy leading-snug mt-0.5">{value}</p>
      </div>
    </div>
  )
}
