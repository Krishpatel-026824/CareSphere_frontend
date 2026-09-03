import { useState } from 'react'
import { ArrowLeft, FileHeart } from 'lucide-react'
import ServicePageHeading from '../../components/ServicePageHeading'
import HealthRecordConfirm from '../../components/health/HealthRecordConfirm'
import HealthRecordDetail from '../../components/health/HealthRecordDetail'
import HealthRecordsList from '../../components/health/HealthRecordsList'
import LabReportDetail from '../../components/lab/LabReportDetail'
import {
  getHealthRecordConfirm,
  getHealthRecordDetail,
  isPrescriptionHealthRecord,
} from '../../data/generators/healthRecordsGenerator'
import { useHealthRecords } from '../../hooks/useHealthRecords'

export default function HealthRecordsScreen({ onBack }) {
  const { records, moveToBin, deleteForever } = useHealthRecords()
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [pending, setPending] = useState(null)

  function confirmPending() {
    if (!pending) return
    if (pending.type === 'remove') {
      moveToBin(pending.record.id)
      if (selectedRecord?.id === pending.record.id) setSelectedRecord(null)
    } else {
      deleteForever(pending.record.id)
    }
    setPending(null)
  }

  if (selectedRecord) {
    const viewed = getHealthRecordDetail(selectedRecord)

    return (
      <div className="w-full min-h-full bg-bg-gray">
        <div className="w-full max-w-[1440px] mx-auto page-pad py-6 sm:py-8 flex flex-col gap-5">
          <header>
            <button
              type="button"
              onClick={() => setSelectedRecord(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 w-fit mb-4"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              Back to records
            </button>
            <h1 className="font-display text-[32px] font-bold text-navy tracking-tight leading-tight">
              {viewed.kind === 'lab'
                ? 'Lab report'
                : isPrescriptionHealthRecord(selectedRecord)
                  ? 'Prescription'
                  : 'Health record'}
            </h1>
            <p className="text-sm text-body-gray mt-2">{viewed.data.title || selectedRecord.title}</p>
          </header>

          {viewed.kind === 'lab' ? (
            <LabReportDetail report={viewed.data} />
          ) : viewed.kind === 'record' ? (
            <HealthRecordDetail record={viewed.data} />
          ) : (
            <article className="rounded-2xl border border-border-gray bg-white p-5 shadow-sm">
              <h3 className="text-base font-bold text-navy">{viewed.data.title}</h3>
              <p className="text-sm text-body-gray mt-2">{viewed.data.doctorName}</p>
              <p className="text-sm text-body-gray mt-1">
                {viewed.data.dateLabel} • {viewed.data.type}
              </p>
            </article>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-full bg-bg-gray">
      <div className="w-full max-w-[1440px] mx-auto page-pad py-6 sm:py-8 flex flex-col gap-5 min-h-full">
        <header>
          <ServicePageHeading
            icon={FileHeart}
            tone="bg-teal text-white shadow-sm"
            title="Health Records"
            subtitle="Labs, prescriptions, and visit records stay here — open and review them anytime"
          />
        </header>

        <HealthRecordsList
          records={records}
          variant="list"
          emptyText="No lab reports yet. Book a test and your reports will appear here."
          onSelect={setSelectedRecord}
          onAction={(actionId, item) => {
            if (actionId === 'remove') setPending({ type: 'remove', record: item })
            if (actionId === 'destroy') setPending({ type: 'destroy', record: item })
          }}
        />
      </div>

      <HealthRecordConfirm
        copy={pending ? getHealthRecordConfirm(pending.type, pending.record) : null}
        onCancel={() => setPending(null)}
        onConfirm={confirmPending}
      />
    </div>
  )
}
