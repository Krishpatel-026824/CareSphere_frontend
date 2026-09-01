import { X } from 'lucide-react'
import Dialog from '@mui/material/Dialog'
import PrescriptionNotePaper from './PrescriptionNotePaper'

export default function DoctorPatientPrescriptionDetailModal({ open, note, onClose }) {
  if (!note) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', overflow: 'hidden' } }}
    >
      <div className="max-h-[85dvh] flex flex-col bg-white">
        <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-[#E6EBF1] flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-navy">Prescription form</p>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-bg-gray cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-body-gray" />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scroll-y p-4 sm:p-5 bg-[#FAFCFD]">
          <PrescriptionNotePaper note={note} />
        </div>

        <div className="shrink-0 px-4 sm:px-5 py-3 border-t border-[#E6EBF1] bg-white">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-10 rounded-xl border border-[#E6EBF1] bg-white text-sm font-semibold text-navy cursor-pointer hover:bg-bg-gray transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  )
}
