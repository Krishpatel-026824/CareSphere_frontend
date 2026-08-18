import { ArrowLeft, MessageCircle, Phone } from 'lucide-react'

export default function DoctorPatientHeader({ patient, visitCount = 0, onBack, onMessage }) {
  return (
    <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm px-3 sm:px-4 py-3 flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="w-10 h-10 rounded-full border border-border-gray bg-white flex items-center justify-center cursor-pointer hover:border-teal hover:text-teal shrink-0"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5 text-navy" />
      </button>

      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-teal-light shrink-0">
        <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-lg sm:text-xl font-bold text-navy truncate">{patient.name}</h1>
        <p className="text-sm text-body-gray truncate">
          {patient.ageLabel} • {patient.gender} • {patient.city}
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-4 shrink-0">
        <div className="text-right">
          <p className="text-[11px] text-body-gray">Visits</p>
          <p className="text-sm font-bold text-navy">{visitCount}</p>
        </div>
        {patient.phone ? (
          <div className="text-right hidden md:block">
            <p className="text-[11px] text-body-gray inline-flex items-center gap-1 justify-end">
              <Phone className="w-3 h-3" strokeWidth={1.75} />
              Phone
            </p>
            <p className="text-sm font-bold text-navy">{patient.phone}</p>
          </div>
        ) : null}
      </div>

      {onMessage ? (
        <button
          type="button"
          onClick={onMessage}
          className="w-10 h-10 rounded-full bg-teal-light text-teal flex items-center justify-center shrink-0 cursor-pointer hover:bg-teal hover:text-white"
          aria-label={`Chat with ${patient.name}`}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
        </button>
      ) : null}
    </section>
  )
}
