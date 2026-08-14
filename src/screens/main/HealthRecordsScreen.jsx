import { useState } from 'react'
import { ArrowLeft, FileHeart, Trash2 } from 'lucide-react'
import ServicePageHeading from '../../components/ServicePageHeading'
import HealthRecordConfirm from '../../components/health/HealthRecordConfirm'
import HealthRecordDetail from '../../components/health/HealthRecordDetail'
import HealthRecordsExtras from '../../components/health/HealthRecordsExtras'
import HealthRecordsList from '../../components/health/HealthRecordsList'
import LabReportDetail from '../../components/lab/LabReportDetail'
import {
  getHealthRecordConfirm,
  getHealthRecordDetail,
} from '../../data/generators/healthRecordsGenerator'
import { useHealthRecords } from '../../hooks/useHealthRecords'

export default function HealthRecordsScreen({ onBack }) {
  const { records, bin, binCount, moveToBin, restoreFromBin, deleteForever } = useHealthRecords()
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [showBin, setShowBin] = useState(false)
  const [pending, setPending] = useState(null)
  const list = showBin ? bin : records

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
      <div className="w-full min-h-full bg-white">
        <div className="w-full page-pad py-6 sm:py-8 flex flex-col gap-5">
          <header>
            <button
              type="button"
              onClick={() => setSelectedRecord(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal cursor-pointer hover:opacity-70 w-fit mb-4"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              Back to records
            </button>
            <h1 className="text-[32px] font-bold text-navy tracking-tight leading-tight">
              {viewed.kind === 'lab' ? 'Lab report' : 'Health record'}
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
    <div className="w-full min-h-full bg-[#F4F7F8]">
      <div className="w-full page-pad py-6 sm:py-8 flex flex-col gap-6 min-h-full">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ServicePageHeading
            icon={showBin ? Trash2 : FileHeart}
            tone={showBin ? 'bg-rose-50 text-rose-600' : 'bg-teal-light text-teal'}
            title={showBin ? 'Recycle Bin' : 'Health Records'}
            subtitle={
              showBin
                ? 'Restore records or delete them forever'
                : 'View and download your medical reports'
            }
            className=""
          />
          <button
            type="button"
            onClick={() => setShowBin((open) => !open)}
            className={`self-start sm:self-auto min-h-11 pl-1.5 pr-4 rounded-full text-sm font-semibold cursor-pointer inline-flex items-center gap-2.5 shrink-0 transition-colors ${
              showBin
                ? 'bg-teal text-white hover:bg-teal-dark shadow-[0_6px_16px_rgba(14,165,160,0.28)]'
                : 'bg-white text-navy shadow-[0_1px_2px_rgba(11,20,26,0.08)] hover:bg-[#F7FBFA] hover:shadow-[0_4px_14px_rgba(11,20,26,0.10)]'
            }`}
          >
            <span
              className={`relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                showBin ? 'bg-white/20 text-white' : 'bg-teal-light text-teal'
              }`}
            >
              {showBin ? (
                <ArrowLeft className="w-4 h-4" strokeWidth={2} />
              ) : (
                <Trash2 className="w-4 h-4" strokeWidth={1.85} />
              )}
              {!showBin && binCount > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#EA0038] text-white text-[10px] font-bold inline-flex items-center justify-center ring-2 ring-white">
                  {binCount}
                </span>
              ) : null}
            </span>
            {showBin ? 'Back to records' : 'Recycle Bin'}
          </button>
        </header>

        <HealthRecordsList
          records={list}
          variant={showBin ? 'bin' : 'list'}
          emptyText={showBin ? 'Recycle Bin is empty.' : 'No health records yet.'}
          onSelect={setSelectedRecord}
          onAction={(actionId, item) => {
            if (actionId === 'restore') restoreFromBin(item.id)
            if (actionId === 'remove') setPending({ type: 'remove', record: item })
            if (actionId === 'destroy') setPending({ type: 'destroy', record: item })
          }}
        />

        {showBin ? null : <HealthRecordsExtras records={records} />}
      </div>

      <HealthRecordConfirm
        copy={pending ? getHealthRecordConfirm(pending.type, pending.record) : null}
        onCancel={() => setPending(null)}
        onConfirm={confirmPending}
      />
    </div>
  )
}
