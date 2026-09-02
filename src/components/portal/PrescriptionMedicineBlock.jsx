import MedicineThumb from './MedicineThumb'

export default function PrescriptionMedicineBlock({ medicine, index }) {
  if (!medicine) return null

  const schedule = [medicine.dose, medicine.frequency, medicine.duration].filter(Boolean).join(' · ')

  return (
    <div className="px-3.5 py-3 bg-white even:bg-[#FAFCFD]">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-teal-dark">
        Medicine {index + 1}
      </p>
      <div className="mt-2 flex items-start gap-3">
        <MedicineThumb src={medicine.image} className="ring-2 ring-teal/10" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-navy">{medicine.name}</p>
          {schedule ? (
            <p className="text-sm text-body-gray mt-1 leading-relaxed">{schedule}</p>
          ) : null}
          {medicine.useFor ? (
            <span className="inline-flex mt-2 text-[12px] font-semibold text-teal-dark bg-[#E8F7F6] border border-teal/15 px-2.5 py-1 rounded-full">
              {medicine.useFor}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
