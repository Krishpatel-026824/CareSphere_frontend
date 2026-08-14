import { useMemo, useState } from 'react'
import { filterDoctorsByQuickFilter } from '../data/generators/doctorFilter'

export function useDoctorSearchFilter(doctors = []) {
  const [listFilter, setListFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)

  const filtered = useMemo(
    () => filterDoctorsByQuickFilter(doctors, listFilter),
    [doctors, listFilter],
  )

  return {
    listFilter,
    setListFilter,
    filterOpen,
    setFilterOpen,
    filtered,
    filterActive: listFilter !== 'all',
  }
}
