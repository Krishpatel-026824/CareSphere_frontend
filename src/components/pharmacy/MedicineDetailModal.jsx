import { useEffect, useState } from 'react'
import { X, Pill, AlertCircle, Clock, Shield, Package, ZoomIn } from 'lucide-react'
import { Dialog, DialogContent } from '@mui/material'
import { getMedicineInfo } from '../../data/mocks/medicineInfo'

export default function MedicineDetailModal({ open, onClose, item }) {
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    if (!open) setShowImage(false)
  }, [open])

  if (!item) return null
  const info = getMedicineInfo(item.name)

  function handleClose() {
    setShowImage(false)
    onClose?.()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            maxWidth: { xs: '92vw', sm: 480 },
            m: 2,
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', overflow: 'hidden' }}>
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 p-2 rounded-full hover:bg-gray-100 cursor-pointer z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="p-5 sm:p-6 pb-3 flex items-start gap-4 pr-12">
            <button
              type="button"
              onClick={() => item.image && setShowImage(true)}
              disabled={!item.image}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center group ${
                item.image ? 'cursor-pointer hover:border-teal/40 hover:shadow-md' : 'cursor-default'
              }`}
              aria-label={item.image ? `View larger photo of ${item.name}` : undefined}
            >
              {item.image ? (
                <>
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/25 transition-colors flex items-center justify-center">
                    <ZoomIn
                      className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow"
                      strokeWidth={2}
                    />
                  </span>
                </>
              ) : (
                <Pill className="w-9 h-9 text-orange-400" strokeWidth={1.5} />
              )}
            </button>
            <div className="min-w-0 pt-1">
              <h2 className="text-lg sm:text-xl font-bold text-navy leading-tight">{item.name}</h2>
              <p className="text-[13px] text-gray-500 mt-1.5">{info.salt}</p>
              <p className="text-[13px] text-gray-400 mt-0.5">{info.manufacturer}</p>
              {item.image ? (
                <p className="text-[11px] text-teal font-semibold mt-2">Tap image to enlarge</p>
              ) : null}
            </div>
          </div>

          <div className="px-5 sm:px-6 pb-5 sm:pb-6 mt-2 flex flex-col gap-3.5">
            <InfoRow icon={Shield} label="Uses" value={info.use} color="text-teal" />
            <InfoRow icon={Clock} label="Dosage" value={info.dosage} color="text-blue-500" />
            <InfoRow icon={AlertCircle} label="Side Effects" value={info.sideEffects} color="text-amber-500" />
            <InfoRow icon={Package} label="Storage" value={info.storage} color="text-purple-500" />

            <div className="mt-1 rounded-2xl bg-red-50 border border-red-100 px-4 py-3">
              <p className="text-[13px] font-semibold text-red-600 mb-1 inline-flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" strokeWidth={2} />
                Warning
              </p>
              <p className="text-[13px] text-red-700 leading-relaxed">{info.warning}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(showImage && item.image)}
        onClose={() => setShowImage(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            bgcolor: 'transparent',
            boxShadow: 'none',
            maxWidth: { xs: '94vw', sm: 560 },
            m: 2,
          },
        }}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'rgba(7, 26, 47, 0.72)' } },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative', overflow: 'visible' }}>
          <button
            type="button"
            onClick={() => setShowImage(false)}
            className="absolute -top-2 -right-2 sm:top-2 sm:right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 cursor-pointer z-10"
            aria-label="Close image"
          >
            <X className="w-5 h-5 text-navy" />
          </button>
          <div className="rounded-2xl overflow-hidden bg-white shadow-xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-full max-h-[70vh] object-contain bg-[#F7FAFC]"
            />
            <div className="px-4 py-3 border-t border-[#EAF0F5]">
              <p className="text-sm font-bold text-navy truncate">{item.name}</p>
              <p className="text-xs text-body-gray mt-0.5 truncate">{info.salt}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function InfoRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`w-9 h-9 rounded-xl bg-[#F7FAFC] flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-4 h-4" strokeWidth={2} />
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-navy leading-snug mt-1">{value}</p>
      </div>
    </div>
  )
}
