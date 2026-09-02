import { useMemo, useState } from 'react'
import { matchesRxQuery } from './DoctorPatientPrescriptionsTabParts'
import {
  CatalogMedicineCell,
  MEDICINE_CATALOG_COLUMNS,
} from './DoctorPatientMedicineTabParts'
import {
  PatientChartEmpty,
  PatientChartPanel,
  PatientChartSearch,
  PatientChartTable,
  PatientChartTd,
  PatientChartTh,
  PatientChartThead,
} from './PatientChartTable'

export default function DoctorPatientMedicineTab({ items = [] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => items.filter((item) => matchesRxQuery(item, query)),
    [items, query],
  )

  const tableScroll = filtered.length > 8

  return (
    <PatientChartPanel
      title="Medicine"
      fill
      action={
        <div className="w-full sm:w-[min(100%,300px)]">
          <PatientChartSearch
            compact
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search medicines"
            aria-label="Search medicine catalog"
          />
        </div>
      }
    >
      {!items.length ? (
        <PatientChartEmpty text="No medicines available in the catalog." />
      ) : !filtered.length ? (
        <PatientChartEmpty text="No medicines match your search." />
      ) : (
        <PatientChartTable
          fit={!tableScroll}
          fill={tableScroll}
          fixed
          minWidth="900px"
          className="text-[14px]"
        >
          <colgroup>
            {MEDICINE_CATALOG_COLUMNS.map((column) => (
              <col key={column.key} style={{ width: column.width }} />
            ))}
          </colgroup>
          <PatientChartThead>
            <tr>
              {MEDICINE_CATALOG_COLUMNS.map((column) => (
                <PatientChartTh
                  key={column.key}
                  center={column.center}
                  className="!px-3 sm:!px-4"
                >
                  {column.label}
                </PatientChartTh>
              ))}
            </tr>
          </PatientChartThead>
          <tbody>
            {filtered.map((item, index) => (
              <tr
                key={item.id}
                className="transition-colors bg-white even:bg-[#FAFCFD] hover:bg-[#F0FAF9]"
              >
                <PatientChartTd center className="!py-2.5 !px-3 sm:!px-4 text-[14px] font-semibold text-body-gray tabular-nums">
                  {index + 1}
                </PatientChartTd>
                <PatientChartTd className="!py-2.5 !px-3 sm:!px-4">
                  <CatalogMedicineCell item={item} />
                </PatientChartTd>
                <PatientChartTd center className="!py-2.5 !px-3 sm:!px-4 text-[14px] font-medium text-navy whitespace-nowrap">
                  {item.pack || '—'}
                </PatientChartTd>
                <PatientChartTd center className="!py-2.5 !px-3 sm:!px-4 text-[14px] font-semibold text-navy whitespace-nowrap tabular-nums">
                  {item.dose || '—'}
                </PatientChartTd>
                <PatientChartTd center className="!py-2.5 !px-3 sm:!px-4 text-[14px] font-medium text-navy whitespace-nowrap">
                  {item.frequency || '—'}
                </PatientChartTd>
                <PatientChartTd className="!py-2.5 !px-3 sm:!px-4">
                  <p className="text-[14px] font-medium text-navy leading-snug line-clamp-2">
                    {item.useFor || 'As advised'}
                  </p>
                </PatientChartTd>
              </tr>
            ))}
          </tbody>
        </PatientChartTable>
      )}
    </PatientChartPanel>
  )
}
