import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, TextField, MenuItem, Select, Button } from '@mui/material'

const periods = ['Morning', 'Afternoon', 'Evening', 'Night']
const timings = ['Before breakfast', 'After breakfast', 'Before lunch', 'After lunch', 'Before dinner', 'After dinner', 'At bedtime']

export default function MedicineFormModal({ open, onClose, onSave, onDelete, medicine }) {
  const isEdit = Boolean(medicine)
  const [form, setForm] = useState({
    medicineName: '',
    dosage: '1 tablet',
    period: 'Morning',
    timing: 'After breakfast',
    timeLabel: '08:00 AM',
    remainingCount: 30,
    remainingTotal: 30,
  })

  useEffect(() => {
    if (medicine) {
      setForm({
        medicineName: medicine.medicineName || '',
        dosage: medicine.dosage || '1 tablet',
        period: medicine.period || 'Morning',
        timing: medicine.timing || 'After breakfast',
        timeLabel: medicine.timeLabel || '08:00 AM',
        remainingCount: medicine.remainingCount || 30,
        remainingTotal: medicine.remainingTotal || 30,
      })
    } else {
      setForm({ medicineName: '', dosage: '1 tablet', period: 'Morning', timing: 'After breakfast', timeLabel: '08:00 AM', remainingCount: 30, remainingTotal: 30 })
    }
  }, [medicine, open])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSave = () => {
    if (!form.medicineName.trim()) return
    const data = {
      ...form,
      id: medicine?.id || `dose-${Date.now()}`,
      schedule: `Daily • ${form.timing}`,
      image: medicine?.image || '',
    }
    onSave(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 3, position: 'relative' }}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 cursor-pointer">
          <X className="w-5 h-5 text-gray-500" />
        </button>
        <h3 className="text-lg font-bold text-navy mb-4">{isEdit ? 'Edit Medicine' : 'Add Medicine'}</h3>
        <div className="flex flex-col gap-3">
          <TextField label="Medicine Name" value={form.medicineName} onChange={handleChange('medicineName')} size="small" fullWidth required />
          <TextField label="Dosage" value={form.dosage} onChange={handleChange('dosage')} size="small" fullWidth placeholder="e.g. 1 tablet, 2 capsules" />
          <Select value={form.period} onChange={handleChange('period')} size="small" fullWidth>
            {periods.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
          </Select>
          <Select value={form.timing} onChange={handleChange('timing')} size="small" fullWidth>
            {timings.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </Select>
          <TextField label="Time" value={form.timeLabel} onChange={handleChange('timeLabel')} size="small" fullWidth placeholder="e.g. 08:00 AM" />
          <TextField label="Total tablets" type="number" value={form.remainingTotal} onChange={(e) => setForm((f) => ({ ...f, remainingTotal: Number(e.target.value), remainingCount: Number(e.target.value) }))} size="small" fullWidth />
        </div>
        <div className="flex items-center gap-2 mt-5">
          <Button variant="contained" onClick={handleSave} fullWidth sx={{ textTransform: 'none', bgcolor: '#00BFA5', '&:hover': { bgcolor: '#00997F' } }}>
            {isEdit ? 'Update' : 'Add'}
          </Button>
          {isEdit && (
            <Button variant="outlined" color="error" onClick={() => { onDelete(medicine.id); onClose() }} sx={{ textTransform: 'none' }}>
              Delete
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
