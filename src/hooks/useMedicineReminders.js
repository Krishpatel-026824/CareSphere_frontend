import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  markAsTaken,
  addMedicine,
  updateMedicine,
  removeMedicine,
  selectMedicines,
  selectMedicineStartIndex,
  selectPendingReminders,
  selectTakenById,
} from '../store/slices/medicinesSlice'

export function useMedicineReminders() {
  const dispatch = useAppDispatch()
  const medicines = useAppSelector(selectMedicines)
  const takenById = useAppSelector(selectTakenById)
  const startIndex = useAppSelector(selectMedicineStartIndex)
  const pendingCount = useAppSelector(selectPendingReminders)

  return {
    medicines,
    takenById,
    startIndex,
    pendingCount,
    markAsTaken: (id) => dispatch(markAsTaken(id)),
    addMedicine: (med) => dispatch(addMedicine(med)),
    updateMedicine: (med) => dispatch(updateMedicine(med)),
    removeMedicine: (id) => dispatch(removeMedicine(id)),
  }
}
