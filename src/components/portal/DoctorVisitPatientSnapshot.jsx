export default function DoctorVisitPatientSnapshot({ patientMeta, detail }) {
  const chips = [
    patientMeta ? `${patientMeta.ageLabel} · ${patientMeta.gender}` : null,
    detail?.specialty,
    detail?.checkInLabel,
  ].filter(Boolean)

  if (!chips.length) return null

  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full bg-[#F4F7FA] px-3 py-1.5 text-xs font-semibold text-navy"
        >
          {chip}
        </span>
      ))}
    </div>
  )
}
