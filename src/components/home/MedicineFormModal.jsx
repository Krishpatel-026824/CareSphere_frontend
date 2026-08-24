import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Dialog, DialogContent, TextField, MenuItem, Select, Button } from '@mui/material'
import {
  getPharmacyMedicineOptions,
  resolveMedicineImage,
} from '../../data/generators/medicineImageResolver'

const periods = ['Morning', 'Afternoon', 'Evening', 'Night']
const timings = [
  'Before breakfast',
  'After breakfast',
  'Before lunch',
  'After lunch',
  'Before dinner',
  'After dinner',
  'At bedtime',
]

const emptyForm = {
  medicineName: '',
  pharmacyId: '',
  dosage: '1 tablet',
  period: 'Morning',
  timing: 'After breakfast',
  timeLabel: '08:00 AM',
  remainingCount: 30,
  remainingTotal: 30,
  image: '',
}

export default function MedicineFormModal({ open, onClose, onSave, onDelete, medicine }) {
  const isEdit = Boolean(medicine)
  const pharmacyOptions = useMemo(() => getPharmacyMedicineOptions(), [])
  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    if (medicine) {
      setForm({
        medicineName: medicine.medicineName || '',
        pharmacyId: medicine.pharmacyId || '',
        dosage: medicine.dosage || '1 tablet',
        period: medicine.period || 'Morning',
        timing: medicine.timing || 'After breakfast',
        timeLabel: medicine.timeLabel || '08:00 AM',
        remainingCount: medicine.remainingCount || 30,
        remainingTotal: medicine.remainingTotal || 30,
        image: medicine.image || resolveMedicineImage(medicine.medicineName, medicine.pharmacyId),
      })
      setQuery('')
      return
    }
    setForm(emptyForm)
    setQuery('')
  }, [medicine, open])

  const filteredPharmacy = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pharmacyOptions.slice(0, 12)
    return pharmacyOptions
      .filter((item) => item.name.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q))
      .slice(0, 12)
  }, [pharmacyOptions, query])

  const previewImage = form.image || resolveMedicineImage(form.medicineName, form.pharmacyId)

  function handleChange(field) {
    return (event) => {
      const value = event.target.value
      setForm((prev) => {
        const next = { ...prev, [field]: value }
        if (field === 'medicineName') {
          next.pharmacyId = ''
          next.image = resolveMedicineImage(value)
        }
        return next
      })
    }
  }

  function selectPharmacyItem(item) {
    setForm((prev) => ({
      ...prev,
      medicineName: item.name,
      pharmacyId: item.id,
      image: item.image,
      dosage: item.subtitle?.includes('capsule') ? '1 capsule' : prev.dosage || '1 tablet',
    }))
    setQuery('')
  }

  function handleSave() {
    if (!form.medicineName.trim()) return
    const image = resolveMedicineImage(form.medicineName, form.pharmacyId) || form.image || ''
    onSave({
      ...form,
      id: medicine?.id || `dose-${Date.now()}`,
      schedule: `Daily • ${form.timing}`,
      image,
      remaining: `${form.remainingCount} left`,
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: 3, position: 'relative' }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h3 className="text-lg font-bold text-navy mb-4">{isEdit ? 'Edit Medicine' : 'Add Medicine'}</h3>

        <div className="flex items-center gap-3 mb-4 rounded-xl border border-border-gray bg-[#F8FBFC] p-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 bg-white shrink-0 flex items-center justify-center">
            {previewImage ? (
              <img src={previewImage} alt={form.medicineName || 'Medicine'} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] text-body-gray text-center px-1">No image</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-navy truncate">{form.medicineName || 'Select a pharmacy medicine'}</p>
            <p className="text-xs text-body-gray mt-0.5">Same product photo as CareSphere Pharmacy</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-semibold text-navy mb-2">Choose from pharmacy</p>
          <div className="rounded-xl border border-border-gray bg-white px-3 py-2 flex items-center gap-2 mb-2">
            <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.75} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search pharmacy medicines..."
              className="w-full text-sm outline-none bg-transparent placeholder:text-body-gray"
            />
          </div>
          <div className="max-h-40 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredPharmacy.map((item) => {
              const selected = form.pharmacyId === item.id || form.medicineName === item.name
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPharmacyItem(item)}
                  className={`flex items-center gap-2.5 rounded-xl border p-2 text-left cursor-pointer transition-colors ${
                    selected
                      ? 'border-teal bg-teal-light/40'
                      : 'border-border-gray bg-white hover:border-teal/40'
                  }`}
                >
                  <span className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-white shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold text-navy truncate">{item.name}</span>
                    <span className="block text-[10px] text-body-gray truncate">{item.subtitle}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <TextField
            label="Medicine Name"
            value={form.medicineName}
            onChange={handleChange('medicineName')}
            size="small"
            fullWidth
            required
          />
          <TextField
            label="Dosage"
            value={form.dosage}
            onChange={handleChange('dosage')}
            size="small"
            fullWidth
            placeholder="e.g. 1 tablet, 2 capsules"
          />
          <Select value={form.period} onChange={handleChange('period')} size="small" fullWidth>
            {periods.map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
          <Select value={form.timing} onChange={handleChange('timing')} size="small" fullWidth>
            {timings.map((timing) => (
              <MenuItem key={timing} value={timing}>
                {timing}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Time"
            value={form.timeLabel}
            onChange={handleChange('timeLabel')}
            size="small"
            fullWidth
            placeholder="e.g. 08:00 AM"
          />
          <TextField
            label="Total tablets"
            type="number"
            value={form.remainingTotal}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                remainingTotal: Number(event.target.value),
                remainingCount: Number(event.target.value),
              }))
            }
            size="small"
            fullWidth
          />
        </div>

        <div className="flex items-center gap-2 mt-5">
          <Button
            variant="contained"
            onClick={handleSave}
            fullWidth
            sx={{ textTransform: 'none', bgcolor: '#00BFA5', '&:hover': { bgcolor: '#00997F' } }}
          >
            {isEdit ? 'Update' : 'Add'}
          </Button>
          {isEdit ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                onDelete(medicine.id)
                onClose()
              }}
              sx={{ textTransform: 'none' }}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
