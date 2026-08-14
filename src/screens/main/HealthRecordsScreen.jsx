import { useState } from 'react'
import { ArrowLeft, FileHeart, Recycle } from 'lucide-react'
import ServicePageHeading from '../../components/ServicePageHeading'
import HealthRecordCard from '../../components/health/HealthRecordCard'
import HealthRecordConfirm from '../../components/health/HealthRecordConfirm'
import HealthRecordDetail from '../../components/health/HealthRecordDetail'
import HealthRecordsExtras from '../../components/health/HealthRecordsExtras'
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
  const [menuId, setMenuId] = useState(null)
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
            icon={FileHeart}
            tone="bg-teal-light text-teal"
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
            onClick={() => {
              setShowBin((open) => !open)
              setMenuId(null)
            }}
            className={`self-start sm:self-auto min-h-11 px-4 rounded-xl text-sm font-semibold cursor-pointer inline-flex items-center gap-2 shrink-0 ${
              showBin
                ? 'bg-teal text-white hover:bg-teal-dark'
                : 'border border-border-gray bg-white text-navy hover:bg-bg-gray'
            }`}
          >
            {showBin ? <ArrowLeft className="w-4 h-4" strokeWidth={1.75} /> : <Recycle className="w-4 h-4" strokeWidth={1.75} />}
            {showBin ? 'Back to records' : 'Recycle Bin'}
            {!showBin && binCount > 0 ? (
              <span className="min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[11px] font-bold inline-flex items-center justify-center">
                {binCount}
              </span>
            ) : null}
          </button>
        </header>

        <section className="rounded-2xl border border-border-gray bg-white overflow-hidden shadow-sm">
          {list.length === 0 ? (
            <p className="px-5 py-10 text-sm text-body-gray text-center">
              {showBin ? 'Recycle Bin is empty.' : 'No health records yet.'}
            </p>
          ) : (
            list.map((record, index) => (
              <div key={record.id} className={index ? 'border-t border-border-gray' : ''}>
                <HealthRecordCard
                  record={record}
                  variant={showBin ? 'bin' : 'list'}
                  menuOpen={menuId === record.id}
                  onOpenMenu={(item) => setMenuId((id) => (id === item.id ? null : item.id))}
                  onView={(item) => {
                    setMenuId(null)
                    setSelectedRecord(item)
                  }}
                  onAction={(actionId, item) => {
                    setMenuId(null)
                    if (actionId === 'restore') restoreFromBin(item.id)
                    if (actionId === 'remove') setPending({ type: 'remove', record: item })
                    if (actionId === 'destroy') setPending({ type: 'destroy', record: item })
                  }}
                />
              </div>
            ))
          )}
        </section>

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
