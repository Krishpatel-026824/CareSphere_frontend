import { useMemo, useState } from 'react'
import {
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartThead,
  PatientChartToolbar,
} from './PatientChartTable'
import { parseVisitLabel } from '../../utils/prescriptionNoteFormat'

const TYPE_STYLE = {
  visit: 'bg-sky-100 text-sky-800',
  rx: 'bg-teal-light text-teal-dark',
  lab: 'bg-amber-100 text-amber-800',
  note: 'bg-violet-100 text-violet-800',
  edit: 'bg-slate-100 text-slate-700',
}

const TABLE_COLUMNS = ['No.', 'Date', 'Time', 'Action', 'Detail', 'By']

function matchesAuditQuery(item, query) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [item.at, item.action, item.detail, item.actor, item.type]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(q))
}

function splitAuditWhen(at = '') {
  const parsed = parseVisitLabel(at)
  return {
    dateLabel: parsed.dateLabel || at || '—',
    timeLabel: parsed.timeLabel || '—',
  }
}

export default function DoctorPatientAuditTab({ items = [] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => items.filter((item) => matchesAuditQuery(item, query)),
    [items, query],
  )

  const tableScroll = filtered.length > 8

  return (
    <PatientChartPanel
      title="Audit trail"
      subtitle="Chronological log of visits, prescriptions, labs, and notes"
      titleClassName="!text-xl sm:!text-2xl"
      fill
    >
      <PatientChartToolbar>
        <PatientChartSearch
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search action, detail, or actor"
          aria-label="Search audit trail"
        />
      </PatientChartToolbar>

      {!items.length ? (
        <PatientChartEmpty text="No audit activity recorded for this patient yet." />
      ) : !filtered.length ? (
        <PatientChartEmpty text="No audit entries match your search." />
      ) : (
        <>
          <PatientChartTable
            fit={!tableScroll}
            fill={tableScroll}
            fixed
            minWidth="880px"
            className="text-[14px]"
          >
            <PatientChartThead>
              <tr>
                {TABLE_COLUMNS.map((label, index) => (
                  <PatientChartTh
                    key={label}
                    center={index !== 4}
                    className="!text-[12px]"
                  >
                    {label}
                  </PatientChartTh>
                ))}
              </tr>
            </PatientChartThead>
            <tbody>
              {filtered.map((item, index) => {
                const { dateLabel, timeLabel } = splitAuditWhen(item.at)

                return (
                  <tr
                    key={item.id}
                    className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
                  >
                    <PatientChartTd center className="!py-3 text-[14px] font-semibold text-navy">
                      {index + 1}
                    </PatientChartTd>
                    <PatientChartTd center className="!py-3 text-[14px] font-semibold text-navy whitespace-nowrap">
                      {dateLabel}
                    </PatientChartTd>
                    <PatientChartTd center className="!py-3 text-[14px] font-semibold text-navy whitespace-nowrap">
                      {timeLabel}
                    </PatientChartTd>
                    <PatientChartTd center className="!py-3">
                      <span
                        className={`inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          TYPE_STYLE[item.type] || TYPE_STYLE.note
                        }`}
                      >
                        {item.action}
                      </span>
                    </PatientChartTd>
                    <PatientChartTd className="!py-3">
                      <p
                        className="text-[14px] font-medium text-navy leading-snug line-clamp-2"
                        title={item.detail}
                      >
                        {item.detail}
                      </p>
                    </PatientChartTd>
                    <PatientChartTd center className="!py-3 text-[14px] font-medium text-body-gray whitespace-nowrap">
                      {item.actor}
                    </PatientChartTd>
                  </tr>
                )
              })}
            </tbody>
          </PatientChartTable>
          <PatientChartFooter showing={filtered.length} total={items.length} label="events" />
        </>
      )}
    </PatientChartPanel>
  )
}
