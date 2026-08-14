import { ArrowLeft } from 'lucide-react'
import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentListCard from '../../components/appointments/AppointmentListCard'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'

export default function DoctorPatientDetailScreen({
  patient,
  visits = [],
  actions,
  onBack,
  onMessage,
}) {
  if (!patient) return null
  const latest = visits[0]

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1100px] mx-auto page-pad py-4 sm:py-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-xl border border-border-gray bg-white flex items-center justify-center cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5 text-navy" />
        </button>

        <section className="bg-white rounded-2xl border border-border-gray p-4 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-teal-light shrink-0">
            <img src={patient.avatar} alt="" className="w-full h-full object-cover object-top" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-navy">{patient.name}</h1>
            <p className="text-sm text-body-gray">
              {patient.ageLabel} • {patient.gender} • {patient.city}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            {visits.map((visit) => (
              <AppointmentListCard key={visit.id} appointment={visit} />
            ))}
          </div>
          {latest ? (
            <DoctorVisitPanel
              visit={latest}
              canAccept={actions.canAccept(latest)}
              canDecline={actions.canDecline(latest)}
              canComplete={actions.canComplete(latest)}
              onAccept={() => actions.requestAction('accept', latest)}
              onDecline={() => actions.requestAction('decline', latest)}
              onComplete={() => actions.requestAction('complete', latest)}
              onMessage={() => onMessage?.(latest)}
            />
          ) : null}
        </div>
      </div>
      <AppointmentActionDialog
        open={Boolean(actions.dialog)}
        copy={actions.dialog?.copy}
        onClose={actions.closeDialog}
        onConfirm={actions.submitDialog}
      />
    </div>
  )
}
