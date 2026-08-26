import { useEffect, useMemo, useState } from 'react'
import QuickActionHeader from '../../components/home/QuickActionHeader'
import DoctorClinicLabReportView from '../../components/portal/DoctorClinicLabReportView'
import DoctorClinicStatCard from '../../components/portal/DoctorClinicStatCard'
import DoctorClinicTaskCard from '../../components/portal/DoctorClinicTaskCard'
import DoctorClinicTaskPanel from '../../components/portal/DoctorClinicTaskPanel'
import DoctorPrescribePanel from '../../components/portal/DoctorPrescribePanel'
import DoctorPrescribeStart from '../../components/portal/DoctorPrescribeStart'
import { clinicToolStatCopy } from '../../data/mocks/doctorClinicTools'

const RX_BADGE_ORDER = { New: 0, Update: 1, Refill: 2 }
const RX_FLOW_ORDER = ['New', 'Update', 'Refill']

function sortRxTasks(items) {
  return [...items].sort((a, b) => {
    const left = RX_BADGE_ORDER[a.badge] ?? 99
    const right = RX_BADGE_ORDER[b.badge] ?? 99
    if (left !== right) return left - right
    return String(a.patientName || '').localeCompare(String(b.patientName || ''))
  })
}

function preferredFilter(items) {
  for (const id of RX_FLOW_ORDER) {
    if (items.some((task) => task.badge === id)) return id
  }
  return 'New'
}

function nextFilterWithWork(items, currentId) {
  const start = Math.max(0, RX_FLOW_ORDER.indexOf(currentId))
  for (let i = start; i < RX_FLOW_ORDER.length; i += 1) {
    const id = RX_FLOW_ORDER[i]
    if (items.some((task) => task.badge === id)) return id
  }
  for (const id of RX_FLOW_ORDER) {
    if (items.some((task) => task.badge === id)) return id
  }
  return preferredFilter(items)
}

function buildStats(items, isPrescribe) {
  const badgeCounts = items.reduce((counts, task) => {
    counts[task.badge] = (counts[task.badge] || 0) + 1
    return counts
  }, {})

  const entries = Object.entries(badgeCounts)
  if (isPrescribe) {
    entries.sort((a, b) => (RX_BADGE_ORDER[a[0]] ?? 99) - (RX_BADGE_ORDER[b[0]] ?? 99))
    return entries.map(([label, count]) => {
      const copy = clinicToolStatCopy[label] || clinicToolStatCopy.all
      return {
        id: label,
        label,
        value: String(count),
        hint: copy.hint,
        footer: `${count} ${copy.footer}`,
      }
    })
  }

  return [
    { id: 'all', label: 'Pending', count: items.length },
    ...entries.map(([label, count]) => ({
      id: label,
      label,
      count,
    })),
  ].map((item) => {
    const copy = clinicToolStatCopy[item.id] || clinicToolStatCopy.all
    return {
      id: item.id,
      label: item.label,
      value: String(item.count),
      hint: copy.hint,
      footer: `${item.count} ${copy.footer}`,
    }
  })
}

export default function DoctorClinicToolScreen({
  tool,
  title,
  subtitle,
  listTitle,
  actionLabel,
  instructionsLabel,
  planLabel,
  viewReportLabel,
  backToOrderLabel,
  empty,
  tasks: initialTasks = [],
  autoStart = false,
  onBack,
  onSelectTask,
  onSignComplete,
  onOpenSigned,
}) {
  const isPrescribe = tool === 'prescribe'
  const starter = useMemo(
    () => (isPrescribe ? sortRxTasks(initialTasks) : initialTasks),
    [initialTasks, isPrescribe],
  )
  const [filterId, setFilterId] = useState(() =>
    isPrescribe && autoStart ? preferredFilter(starter) : 'all',
  )
  const [queue, setQueue] = useState(starter)
  const [selectedId, setSelectedId] = useState(() => {
    if (!(isPrescribe && autoStart)) return null
    const nextFilter = preferredFilter(starter)
    const nextVisible =
      nextFilter === 'all' ? starter : starter.filter((task) => task.badge === nextFilter)
    return sortRxTasks(nextVisible)[0]?.id || null
  })
  const [showReport, setShowReport] = useState(false)
  const [processStarted, setProcessStarted] = useState(!isPrescribe || autoStart)

  useEffect(() => {
    setQueue(starter)
  }, [starter])

  useEffect(() => {
    if (!isPrescribe || filterId !== 'all') return
    setFilterId(preferredFilter(starter))
  }, [isPrescribe, filterId, starter])

  const stats = useMemo(() => buildStats(queue, isPrescribe), [queue, isPrescribe])
  const badgeCounts = useMemo(
    () =>
      queue.reduce((counts, task) => {
        counts[task.badge] = (counts[task.badge] || 0) + 1
        return counts
      }, {}),
    [queue],
  )
  const visible = useMemo(() => {
    const list = filterId === 'all' ? queue : queue.filter((task) => task.badge === filterId)
    return isPrescribe ? sortRxTasks(list) : list
  }, [queue, filterId, isPrescribe])
  const selected = visible.find((task) => task.id === selectedId) || visible[0] || null
  const activeStat = stats.find((item) => item.id === filterId)
  const activeListTitle =
    filterId === 'all' ? listTitle : `${activeStat?.label || filterId} queue`

  useEffect(() => {
    if (!processStarted) return
    if (!visible.some((task) => task.id === selectedId)) {
      setSelectedId(visible[0]?.id || null)
    }
  }, [visible, selectedId, processStarted])

  useEffect(() => {
    setShowReport(false)
  }, [selected?.id, filterId])

  function handleStartProcess() {
    const nextFilter = preferredFilter(queue)
    const nextVisible =
      nextFilter === 'all' ? queue : queue.filter((task) => task.badge === nextFilter)
    const ordered = isPrescribe ? sortRxTasks(nextVisible) : nextVisible
    setFilterId(nextFilter)
    setSelectedId(ordered[0]?.id || null)
    setProcessStarted(true)
  }

  function handleFilter(id) {
    if (!processStarted) return
    setFilterId(id)
  }

  function handleCompleteTask(task) {
    if (!task?.id) return

    if (onSignComplete) {
      onSignComplete(task)
      return
    }

    setQueue((prev) => {
      const next = prev.filter((item) => item.id !== task.id)
      let nextFilter = filterId
      let nextVisible =
        nextFilter === 'all' ? next : next.filter((item) => item.badge === nextFilter)

      if (isPrescribe && nextVisible.length === 0 && next.length > 0) {
        nextFilter = nextFilterWithWork(next, filterId)
        nextVisible =
          nextFilter === 'all' ? next : next.filter((item) => item.badge === nextFilter)
        setFilterId(nextFilter)
      }

      const nextSelected = (isPrescribe ? sortRxTasks(nextVisible) : nextVisible)[0] || null
      setSelectedId(nextSelected?.id || null)
      return next
    })
  }

  return (
    <div className="w-full h-full min-h-full bg-transparent flex flex-col">
      <div className="w-full flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        {isPrescribe && !processStarted ? (
          <DoctorPrescribeStart
            counts={badgeCounts}
            total={queue.length}
            onStart={handleStartProcess}
            onOpenSigned={onOpenSigned}
          />
        ) : (
          <>
            <QuickActionHeader
              title={title}
              subtitle={
                isPrescribe
                  ? 'Select a queue, review the prescription, then sign.'
                  : subtitle
              }
              backLabel="Back"
              onBack={
                isPrescribe
                  ? () => {
                      setProcessStarted(false)
                      setFilterId('all')
                      setSelectedId(null)
                    }
                  : onBack
              }
            />

            {isPrescribe && onOpenSigned ? (
              <div className="shrink-0 flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={onOpenSigned}
                  className="text-sm font-semibold text-teal cursor-pointer hover:opacity-70"
                >
                  View signed table
                </button>
              </div>
            ) : null}

            {processStarted && stats.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
                {stats.map((item) => (
                  <DoctorClinicStatCard
                    key={item.id}
                    item={item}
                    active={item.id === filterId}
                    onSelect={handleFilter}
                  />
                ))}
              </div>
            ) : null}

            {processStarted && queue.length === 0 ? (
              <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] p-6 flex flex-col justify-center text-center gap-2">
                <p className="text-base font-bold text-navy">All caught up</p>
                <p className="text-sm text-body-gray">{empty}</p>
              </section>
            ) : processStarted ? (
              <div className="flex-1 min-h-0 flex flex-col xl:flex-row items-stretch gap-4">
                <section className="xl:w-[380px] 2xl:w-[420px] shrink-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm p-4 flex flex-col min-h-0">
                  <div className="flex items-center justify-between gap-2 shrink-0 mb-1">
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
                        Select Rx
                      </p>
                      <h2 className="text-lg font-bold text-navy truncate">{activeListTitle}</h2>
                    </div>
                    <span className="text-sm font-semibold text-body-gray tabular-nums">
                      {visible.length}
                    </span>
                  </div>
                  {activeStat?.hint ? (
                    <p className="text-[12px] text-body-gray mb-3 shrink-0">{activeStat.hint}</p>
                  ) : (
                    <div className="mb-3" />
                  )}
                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 max-h-[240px] xl:max-h-none">
                    {visible.length === 0 ? (
                      <p className="text-sm text-body-gray rounded-xl border border-[#E6EBF1] bg-[#F8FAFC] px-3 py-4 text-center">
                        No {activeStat?.label || 'items'} waiting. Pick another queue above.
                      </p>
                    ) : (
                      visible.map((task) => (
                        <DoctorClinicTaskCard
                          key={task.id}
                          task={task}
                          selected={selected?.id === task.id}
                          onSelect={(item) => setSelectedId(item.id)}
                        />
                      ))
                    )}
                  </div>
                </section>
                <div className="flex-1 min-w-0 min-h-0">
                  {showReport && selected?.labReport ? (
                    <DoctorClinicLabReportView
                      report={selected.labReport}
                      backLabel={backToOrderLabel}
                      onBack={() => setShowReport(false)}
                    />
                  ) : isPrescribe ? (
                    <DoctorPrescribePanel
                      task={selected}
                      filterLabel={activeStat?.label || 'Pending'}
                      queueIndex={
                        Math.max(0, visible.findIndex((item) => item.id === selected?.id)) + 1
                      }
                      queueTotal={visible.length}
                      onComplete={handleCompleteTask}
                      onOpenPatient={onSelectTask}
                    />
                  ) : (
                    <DoctorClinicTaskPanel
                      task={selected}
                      instructionsLabel={instructionsLabel}
                      planLabel={planLabel}
                      actionLabel={actionLabel}
                      viewReportLabel={viewReportLabel}
                      onViewReport={selected?.labReport ? () => setShowReport(true) : undefined}
                      onOpenPatient={onSelectTask}
                    />
                  )}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
