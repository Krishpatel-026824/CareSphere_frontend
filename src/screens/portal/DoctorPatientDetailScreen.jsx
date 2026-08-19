import AppointmentActionDialog from '../../components/appointments/AppointmentActionDialog'
import AppointmentActionMenu from '../../components/appointments/AppointmentActionMenu'
import DoctorPatientHeader from '../../components/portal/DoctorPatientHeader'
import DoctorPatientVisitList from '../../components/portal/DoctorPatientVisitList'
import DoctorVisitPanel from '../../components/portal/DoctorVisitPanel'
import { useDoctorPatientChart } from '../../hooks/useDoctorPatientChart'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export default function DoctorPatientDetailScreen({
  patient,
  visits = [],
  actions,
  onBack,
  onMessage,
}) {
  const chart = useDoctorPatientChart(visits)
  const bp = useBreakpoint()
  if (!patient) return null

  const selected = chart.selected

  return (
    <div className="w-full h-full min-h-full bg-[#F3F4F6] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-3">
        <DoctorPatientHeader
          patient={patient}
          visitCount={chart.list.length}
          onBack={onBack}
          onMessage={onMessage}
        />

        <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-3 overflow-hidden">
          <DoctorPatientVisitList
            upcoming={chart.upcoming}
            history={chart.history}
            selectedId={selected?.id}
            onSelect={chart.select}
            onOpenMenu={actions.openMenu}
          />

          {selected ? (
            <div className="flex-1 min-w-0 w-full min-h-0 flex flex-col overflow-hidden">
              <DoctorVisitPanel
                visit={selected}
                hideIdentity
                fillHeight={bp.xl}
                canAccept={actions.canAccept(selected)}
                canDecline={actions.canDecline(selected)}
                canComplete={actions.canComplete(selected)}
                onAccept={() => actions.requestAction('accept', selected)}
                onDecline={() => actions.requestAction('decline', selected)}
                onComplete={() => actions.requestAction('complete', selected)}
                onMessage={() => onMessage?.(selected)}
              />
            </div>
          ) : null}
        </div>
      </div>

      <AppointmentActionMenu
        open={Boolean(actions.menu)}
        options={actions.menu?.options}
        x={actions.menu?.x}
        y={actions.menu?.y}
        onClose={actions.closeMenu}
        onSelect={(id) => actions.requestAction(id, actions.menu?.visit)}
      />
      <AppointmentActionDialog
        open={Boolean(actions.dialog)}
        copy={actions.dialog?.copy}
        onClose={actions.closeDialog}
        onConfirm={actions.submitDialog}
      />
    </div>
  )
}
