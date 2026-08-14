import { useMemo } from 'react'
import { generatePharmacyDeliveryEstimate } from '../data/generators/pharmacyDeliveryEstimate'

export function usePharmacyDeliveryEstimate() {
  return useMemo(() => generatePharmacyDeliveryEstimate(), [])
}
