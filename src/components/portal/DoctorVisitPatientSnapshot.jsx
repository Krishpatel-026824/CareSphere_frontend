import { Clock3, MapPin, Phone, Stethoscope, UserRound } from 'lucide-react'

function SnapshotRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 min-w-0">
      <Icon className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" strokeWidth={1.75} />
      <div className="min-w-0">
        <p className="text-[10px] text-body-gray">{label}</p>
        <p className="text-xs sm:text-sm font-semibold text-navy leading-snug break-words">{value}</p>
      </div>
    </div>
  )
}

export default function DoctorVisitPatientSnapshot({ patientMeta, detail }) {
  if (!patientMeta && !detail) return null

  return (
    <div className="rounded-xl border border-[#E6EBF1] bg-white px-3.5 py-3 flex flex-col gap-3 h-full">
      <h3 className="text-xs font-bold text-navy shrink-0">Patient snapshot</h3>
      <div className="grid grid-cols-2 gap-3">
        {patientMeta ? (
          <>
            <SnapshotRow
              icon={UserRound}
              label="Demographics"
              value={`${patientMeta.ageLabel} · ${patientMeta.gender}`}
            />
            <SnapshotRow icon={MapPin} label="City" value={patientMeta.city} />
            <SnapshotRow icon={Phone} label="Contact" value={patientMeta.phone || detail?.phone} />
          </>
        ) : null}
        <SnapshotRow icon={Stethoscope} label="Specialty" value={detail?.specialty} />
        <SnapshotRow icon={Clock3} label="Duration" value={detail?.duration} />
      </div>
      {detail?.checkInLabel ? (
        <p className="text-xs text-body-gray border-t border-dashed border-border-gray pt-2 shrink-0 mt-auto">
          {detail.checkInLabel}
        </p>
      ) : null}
    </div>
  )
}
