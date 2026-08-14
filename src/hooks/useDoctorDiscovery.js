import {
  doctorFilterHints,
  doctorFilterTitles,
  filterDoctorsByQuickFilter,
} from '../data/generators/doctorFilter'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setDiscoveryFilter, setDiscoveryQuery } from '../store/slices/doctorsSlice'

export function useDoctorDiscovery(data) {
  const dispatch = useAppDispatch()
  const query = useAppSelector((state) => state.doctors.discoveryQuery)
  const listFilter = useAppSelector((state) => state.doctors.discoveryFilter)

  const doctors = data?.doctors || []
  const filteredDoctors = filterDoctorsByQuickFilter(doctors, listFilter).filter((doctor) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.hospital.toLowerCase().includes(q)
    )
  })

  return {
    query,
    setQuery: (value) => dispatch(setDiscoveryQuery(value)),
    listFilter,
    setListFilter: (value) => dispatch(setDiscoveryFilter(value)),
    filteredDoctors,
    resultsTitle: doctorFilterTitles[listFilter],
    resultsHint: doctorFilterHints[listFilter],
    location: data?.location || 'Ahmedabad',
  }
}
