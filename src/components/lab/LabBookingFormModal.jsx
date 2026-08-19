import { useState } from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent, TextField, Select, MenuItem } from '@mui/material'

const collectionTypes = ['Home Collection', 'Visit Lab']
const timeSlots = ['06:00 - 08:00 AM', '08:00 - 10:00 AM', '10:00 - 12:00 PM', '12:00 - 02:00 PM', '02:00 - 04:00 PM', '04:00 - 06:00 PM', '06:00 - 08:00 PM']

export default function LabBookingFormModal({ open, onClose, test, onSubmit }) {
  const [form, setForm] = useState({
    name: 'Krish Patel',
    mobile: '',
    date: '',
    timeSlot: '',
    collectionType: 'Home Collection',
    address: '',
  })
  const [errors, setErrors] = useState({})

  if (!test) return null

  const handleSave = () => {
    const newErrors = {}
    if (!form.mobile) newErrors.mobile = true
    if (!form.date) newErrors.date = true
    if (!form.timeSlot) newErrors.timeSlot = true
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    onSubmit?.({ ...form, test })
    setForm({ name: 'Krish Patel', mobile: '', date: '', timeSlot: '', collectionType: 'Home Collection', address: '' })
    onClose()
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: 0, position: 'relative' }}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 cursor-pointer z-10">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-5">
          <h2 className="text-[16px] font-bold text-navy mb-1">Book Lab Test</h2>
          <p className="text-[13px] text-gray-500 mb-4">{test.name} • ₹{test.price}</p>

          <div className="flex flex-col gap-3.5">
            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1">Full Name</p>
              <TextField value={form.name} onChange={set('name')} size="small" fullWidth />
            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1">Mobile Number</p>
              <TextField value={form.mobile} onChange={(e) => { set('mobile')(e); setErrors((p) => ({ ...p, mobile: false })) }} size="small" fullWidth placeholder="Enter 10-digit number" error={!!errors.mobile} helperText={errors.mobile ? 'Required' : ''} />
            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1">Appointment Date</p>
              <TextField type="date" value={form.date} onChange={(e) => { set('date')(e); setErrors((p) => ({ ...p, date: false })) }} size="small" fullWidth error={!!errors.date} helperText={errors.date ? 'Required' : ''} />
            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1">Time Slot</p>
              <Select value={form.timeSlot} onChange={(e) => { set('timeSlot')(e); setErrors((p) => ({ ...p, timeSlot: false })) }} size="small" fullWidth displayEmpty error={!!errors.timeSlot}>
                <MenuItem value="" disabled>Select time slot</MenuItem>
                {timeSlots.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </div>

            <div>
              <p className="text-[12px] font-medium text-gray-500 mb-1">Collection Type</p>
              <Select value={form.collectionType} onChange={set('collectionType')} size="small" fullWidth>
                {collectionTypes.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </div>

            {form.collectionType === 'Home Collection' && (
              <div>
                <p className="text-[12px] font-medium text-gray-500 mb-1">Address</p>
                <TextField value={form.address} onChange={set('address')} size="small" fullWidth multiline rows={2} placeholder="Enter home address for sample collection" />
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-5">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-gray-200 text-navy text-sm font-semibold cursor-pointer hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={handleSave} className="flex-1 h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark">Confirm Booking</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
