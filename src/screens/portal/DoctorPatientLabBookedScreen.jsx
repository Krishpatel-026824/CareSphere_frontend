import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectOrderedLabsForPatient } from '../../store/slices/doctorPatientLabsSlice'
import { DoctorPatientDetailBack } from '../../components/portal/DoctorPatientHeader'
import { LabTestCell, matchesLabQuery } from '../../components/portal/DoctorPatientLabsTabParts'
import {
  PatientChartEmpty,
  PatientChartFooter,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartThead,
  PatientChartToolbar,
} from '../../components/portal/PatientChartTable'

export default function DoctorPatientLabBookedScreen({ patient, patientId, onBack, onBookNew }) {
  const ordered = useSelector((state) => selectOrderedLabsForPatient(state, patientId))
  const [query, setQuery] = useState('')

  const rows = useMemo(
    () => ordered.filter((item) => matchesLabQuery(item, query)),
    [ordered, query],
  )

  const tableScroll = rows.length > 8

  return (
    <div className="w-full h-full min-h-0 bg-[#F4F7FA] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 page-pad py-3 sm:py-4 flex flex-col gap-3 max-w-[960px] mx-auto w-full">
        <DoctorPatientDetailBack onBack={onBack} label="Back to lab reports" />

        <header className="shrink-0 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">Booked reports</h1>
            <p className="text-sm text-body-gray mt-1">
              Pending lab orders for{' '}
              <span className="font-semibold text-navy">{patient?.name}</span>
            </p>
          </div>
          {onBookNew ? (
            <button
              type="button"
              onClick={onBookNew}
              className="shrink-0 min-h-9 px-3.5 rounded-xl bg-teal text-white text-[12px] sm:text-[13px] font-semibold cursor-pointer hover:bg-teal-dark shadow-sm transition-colors"
            >
              New lab report
            </button>
          ) : null}
        </header>

        <section className="flex-1 min-h-0 rounded-2xl border border-[#E6EBF1] bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="shrink-0 h-1 bg-gradient-to-r from-teal via-[#14B8A6] to-teal-dark" />
          <PatientChartToolbar>
            <PatientChartSearch
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search booked reports"
              aria-label="Search booked reports"
            />
          </PatientChartToolbar>

          {!rows.length ? (
            <PatientChartEmpty text="No booked lab reports yet. Tap New lab report to order tests for this patient." />
          ) : (
            <>
              <PatientChartTable fit={!tableScroll} fill={tableScroll}>
                <PatientChartThead>
                  <tr>
                    {['No.', 'Report', 'Booked', 'Collection', 'Priority'].map((label, index) => (
                      <PatientChartTh key={label} center={index !== 1}>
                        {label}
                      </PatientChartTh>
                    ))}
                  </tr>
                </PatientChartThead>
                <tbody>
                  {rows.map((item, index) => (
                    <tr
                      key={item.id}
                      className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
                    >
                      <PatientChartTd center className="!py-3.5">
                        {index + 1}
                      </PatientChartTd>
                      <PatientChartTd className="!py-3.5">
                        <LabTestCell item={item} />
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5 whitespace-nowrap">
                        {item.dateLabel || '—'}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5 text-[14px] font-medium text-navy">
                        {item.collectionType || '—'}
                      </PatientChartTd>
                      <PatientChartTd center className="!py-3.5">
                        <span className="inline-flex text-[12px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.priority || 'Routine'}
                        </span>
                      </PatientChartTd>
                    </tr>
                  ))}
                </tbody>
              </PatientChartTable>
              <PatientChartFooter showing={rows.length} total={ordered.length} label="booked reports" />
            </>
          )}
        </section>
      </div>
    </div>
  )
}
