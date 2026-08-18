export default function PatientChatResult({ patient, onChat }) {
  return (
    <button
      type="button"
      onClick={() => onChat?.(patient)}
      className="w-full text-left rounded-2xl p-3.5 flex items-center gap-3 bg-white border border-transparent shadow-sm cursor-pointer hover:bg-bg-gray"
    >
      <div className="w-12 h-12 rounded-full bg-teal-light overflow-hidden shrink-0">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-navy truncate">{patient.name}</h2>
        <p className="text-xs text-body-gray mt-0.5 truncate">
          {patient.ageLabel} • {patient.city}
        </p>
      </div>
    </button>
  )
}
