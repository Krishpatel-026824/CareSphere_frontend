import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setCatalogQuery,
  toggleCatalogBrand,
  toggleCatalogFilter,
} from '../store/slices/pharmacySlice'

export function usePharmacyCatalog(items = []) {
  const dispatch = useAppDispatch()
  const query = useAppSelector((state) => state.pharmacy.catalogQuery)
  const selectedFilters = useAppSelector((state) => state.pharmacy.selectedFilters)
  const selectedBrands = useAppSelector((state) => state.pharmacy.selectedBrands)

  const catalogItems = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return items.filter((item) => {
      if (needle && !item.name.toLowerCase().includes(needle)) return false
      if (selectedFilters.length) {
        const matchesFilter = selectedFilters.some((filterId) => {
          if (filterId === 'allergies') return item.category === 'allergies' || item.category === 'cetirizines'
          return item.category === filterId
        })
        if (!matchesFilter) return false
      }
      if (selectedBrands.length && !selectedBrands.includes(item.brand)) return false
      return true
    })
  }, [items, query, selectedFilters, selectedBrands])

  return {
    query,
    setQuery: (value) => dispatch(setCatalogQuery(value)),
    selectedFilters,
    toggleFilter: (id) => dispatch(toggleCatalogFilter(id)),
    selectedBrands,
    toggleBrand: (id) => dispatch(toggleCatalogBrand(id)),
    catalogItems,
  }
}
