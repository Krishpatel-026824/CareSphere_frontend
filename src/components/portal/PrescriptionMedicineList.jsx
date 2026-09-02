import MedicineThumb from './MedicineThumb'

function buildSchedule(medicine) {
  return [medicine.dose, medicine.frequency, medicine.duration].filter(Boolean).join(' · ')
}

export default function PrescriptionMedicineList({ medicines = [] }) {
  if (!medicines.length) return null

  return (
    <div className="px-4 sm:px-5 py-4 sm:py-5 bg-[#FFFCF8]">
      <div className="flex items-center gap-2.5 pb-3 mb-1 border-b border-dashed border-[#D0D9E3]">
        <span className="font-display text-[26px] leading-none text-teal-dark" aria-hidden>
          ℞
        </span>
        <p className="text-[13px] text-body-gray">Take medicines as directed below</p>
      </div>

      <ol className="divide-y divide-dashed divide-[#D0D9E3]">
        {medicines.map((medicine, index) => {
          const schedule = buildSchedule(medicine)

          return (
            <li
              key={medicine.id || `${medicine.name}-${index}`}
              className="flex gap-3 py-4 first:pt-3 last:pb-1"
            >
              <span className="font-display text-lg font-bold text-teal-dark tabular-nums shrink-0 w-6">
                {index + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-3">
                  <MedicineThumb src={medicine.image} size="sm" className="mt-0.5 opacity-90" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[17px] font-bold text-navy leading-snug">
                      {medicine.name}
                    </p>
                    {schedule ? (
                      <p className="text-[15px] text-navy mt-2 leading-relaxed">
                        <span className="font-semibold text-body-gray">Sig:</span> {schedule}
                      </p>
                    ) : null}
                    {medicine.useFor ? (
                      <p className="text-[14px] text-body-gray mt-1.5 leading-relaxed">
                        <span className="font-semibold text-navy">For:</span> {medicine.useFor}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
