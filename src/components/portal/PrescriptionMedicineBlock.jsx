import MedicineThumb from './MedicineThumb'

export default function PrescriptionMedicineBlock({ medicine, index }) {
  if (!medicine) return null

  const schedule = [medicine.dose, medicine.frequency, medicine.duration].filter(Boolean).join(' · ')

  return (
    <div className="py-3 border-b border-dashed border-[#E6EBF1] last:border-b-0 last:pb-0 first:pt-0">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-body-gray">
        Medicine {index + 1}
      </p>
      <div className="mt-2 flex items-start gap-3">
        <MedicineThumb src={medicine.image} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-navy">{medicine.name}</p>
          {schedule ? <p className="text-sm text-navy mt-1 leading-relaxed">{schedule}</p> : null}
          {medicine.useFor ? (
            <p className="text-sm text-teal mt-1 leading-relaxed">{medicine.useFor}</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
