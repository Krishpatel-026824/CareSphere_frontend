import { MessageCircle } from 'lucide-react'

export default function PatientChatResult({ patient, onStart }) {
  return (
    <button
      type="button"
      onClick={() => onStart?.(patient)}
      className="w-full text-left px-3 py-3 flex items-center gap-3.5 rounded-xl bg-white border border-[#E6EBF1] cursor-pointer hover:border-teal/30 hover:bg-[#E8F7F6] transition-colors"
    >
      <div className="w-12 h-12 rounded-full bg-teal-light overflow-hidden shrink-0 ring-2 ring-white">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-[14px] font-semibold text-navy truncate">{patient.name}</h2>
        <p className="text-[12px] text-body-gray mt-1 truncate">
          {patient.ageLabel} • {patient.city}
        </p>
      </div>
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal shrink-0">
        <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
        Chat
      </span>
    </button>
  )
}
