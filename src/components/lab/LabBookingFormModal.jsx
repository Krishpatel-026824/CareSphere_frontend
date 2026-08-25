import { useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ChevronDown, X } from 'lucide-react'

const collectionTypes = ['Home Collection', 'Visit Lab']
const timeSlots = [
  '06:00 - 08:00 AM',
  '08:00 - 10:00 AM',
  '10:00 - 12:00 PM',
  '12:00 - 02:00 PM',
  '02:00 - 04:00 PM',
  '04:00 - 06:00 PM',
  '06:00 - 08:00 PM',
]

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    backgroundColor: '#F9FAFB',
    fontSize: '0.925rem',
    minHeight: '44px',
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
  },
}

const selectSx = {
  borderRadius: '10px',
  backgroundColor: '#F9FAFB',
  fontSize: '0.925rem',
  minHeight: '44px',
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#0EA5A0', borderWidth: '1.5px' },
}

const emptyForm = {
  name: 'Krish Patel',
  mobile: '',
  date: null,
  timeSlot: '',
  collectionType: 'Home Collection',
  address: '',
  testId: '',
}

function Field({ label, error, children }) {
  return (
    <div>
      <p className="text-[12px] font-semibold text-[#475569] mb-1.5">{label}</p>
      {children}
      {error ? <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p> : null}
    </div>
  )
}

export default function LabBookingFormModal({
  open,
  onClose,
  tests = [],
  test = null,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    setForm({
      ...emptyForm,
      testId: test?.id || '',
    })
    setErrors({})
    setPickerOpen(false)
  }, [open, test?.id])

  const selectedTest = useMemo(
    () => tests.find((item) => item.id === form.testId) || test || null,
    [form.testId, test, tests],
  )

  function update(next) {
    setForm((prev) => ({ ...prev, ...next }))
  }

  function handleSave() {
    const nextErrors = {}
    if (!form.testId && !selectedTest) nextErrors.testId = 'Select a lab test'
    if (!form.name.trim()) nextErrors.name = 'Full name is required'
    if (!form.mobile.trim()) nextErrors.mobile = 'Mobile number is required'
    if (!form.date) nextErrors.date = 'Date is required'
    if (!form.timeSlot) nextErrors.timeSlot = 'Time slot is required'
    if (form.collectionType === 'Home Collection' && !form.address.trim()) {
      nextErrors.address = 'Address is required for home collection'
    }
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    onSubmit?.({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      date: dayjs(form.date).format('YYYY-MM-DD'),
      timeSlot: form.timeSlot,
      collectionType: form.collectionType,
      address: form.address.trim(),
      test: selectedTest,
    })
    onClose?.()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
      PaperProps={{ sx: { borderRadius: '16px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' } }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEF2F6] shrink-0">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">Book new lab test</h2>
          {selectedTest ? (
            <p className="text-[13px] text-[#64748B] mt-0.5">
              {selectedTest.name} · ₹{selectedTest.price}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4 text-[#64748B]" strokeWidth={2} />
        </button>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="px-6 py-6 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0">
          <Field label="Full Name" error={errors.name}>
            <TextField
              value={form.name}
              onChange={(e) => {
                update({ name: e.target.value })
                setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              placeholder="Enter your full name"
              fullWidth
              size="small"
              sx={fieldSx}
            />
          </Field>

          <Field label="Mobile Number" error={errors.mobile}>
            <TextField
              value={form.mobile}
              onChange={(e) => {
                update({ mobile: e.target.value })
                setErrors((prev) => ({ ...prev, mobile: undefined }))
              }}
              placeholder="Enter 10-digit number"
              fullWidth
              size="small"
              sx={fieldSx}
            />
          </Field>

          <Field label="Lab test" error={errors.testId}>
            <div className="rounded-[10px] border border-[#E5E7EB] bg-[#F9FAFB] overflow-hidden">
              <button
                type="button"
                onClick={() => setPickerOpen((prev) => !prev)}
                className="w-full min-h-11 px-3 py-2 flex items-center gap-2.5 text-left cursor-pointer hover:bg-white transition-colors"
              >
                {selectedTest ? (
                  <>
                    <img
                      src={selectedTest.thumbnail}
                      alt=""
                      className="w-7 h-7 rounded-md object-cover shrink-0"
                    />
                    <span className="flex-1 min-w-0 text-[0.875rem] font-medium text-[#0F172A] truncate">
                      {selectedTest.name} · ₹{selectedTest.price}
                    </span>
                  </>
                ) : (
                  <span className="flex-1 text-[0.875rem] text-[#9CA3AF]">Select lab test</span>
                )}
                <ChevronDown
                  className={`w-4 h-4 text-[#64748B] shrink-0 transition-transform ${pickerOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2}
                />
              </button>

              {pickerOpen ? (
                <div className="border-t border-[#E5E7EB] bg-white">
                  <div className="max-h-40 overflow-y-auto overscroll-contain">
                    {tests.length === 0 ? (
                      <p className="px-3 py-4 text-[12px] text-[#64748B] text-center">No tests found</p>
                    ) : (
                      tests.map((item) => {
                        const active = item.id === form.testId
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              update({ testId: item.id })
                              setErrors((prev) => ({ ...prev, testId: undefined }))
                              setPickerOpen(false)
                            }}
                            className={`w-full px-2.5 py-2 flex items-center gap-2.5 text-left cursor-pointer transition-colors ${
                              active ? 'bg-teal-light/60' : 'hover:bg-[#F8FAFC]'
                            }`}
                          >
                            <img
                              src={item.thumbnail}
                              alt=""
                              className="w-8 h-8 rounded-md object-cover shrink-0 border border-[#E6EBF1]"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-semibold text-navy truncate">{item.name}</span>
                              <span className="block text-[11px] text-[#64748B]">
                                ₹{item.price} · Results in {item.turnaround}
                              </span>
                            </span>
                          </button>
                        )
                      })
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </Field>

          <Field label="Collection date" error={errors.date}>
            <DatePicker
              value={form.date}
              onChange={(value) => {
                update({ date: value })
                setErrors((prev) => ({ ...prev, date: undefined }))
              }}
              disablePast
              slotProps={{ textField: { size: 'small', fullWidth: true, sx: fieldSx } }}
            />
          </Field>

          <Field label="Time Slot" error={errors.timeSlot}>
            <Select
              fullWidth
              size="small"
              displayEmpty
              value={form.timeSlot}
              onChange={(e) => {
                update({ timeSlot: e.target.value })
                setErrors((prev) => ({ ...prev, timeSlot: undefined }))
              }}
              sx={selectSx}
              MenuProps={{
                disablePortal: true,
                PaperProps: { style: { maxHeight: 180 } },
              }}
              renderValue={(v) => v || <span className="text-[#9CA3AF]">Select time slot</span>}
            >
              {timeSlots.map((slot) => (
                <MenuItem key={slot} value={slot} sx={{ fontSize: '0.875rem' }}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </Field>

          <Field label="Collection Type">
            <Select
              fullWidth
              size="small"
              value={form.collectionType}
              onChange={(e) => update({ collectionType: e.target.value })}
              sx={selectSx}
              MenuProps={{ disablePortal: true }}
            >
              {collectionTypes.map((type) => (
                <MenuItem key={type} value={type} sx={{ fontSize: '0.875rem' }}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Field>

          {form.collectionType === 'Home Collection' ? (
            <Field label="Address" error={errors.address}>
              <TextField
                value={form.address}
                onChange={(e) => {
                  update({ address: e.target.value })
                  setErrors((prev) => ({ ...prev, address: undefined }))
                }}
                placeholder="Enter home address for sample collection"
                fullWidth
                size="small"
                multiline
                rows={2}
                sx={fieldSx}
              />
            </Field>
          ) : null}
        </div>
      </LocalizationProvider>

      <div className="px-6 py-4 border-t border-[#EEF2F6] flex gap-3 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 h-11 rounded-xl border border-[#E6EBF1] text-navy text-sm font-semibold cursor-pointer hover:bg-[#F8FAFC]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex-1 h-11 rounded-xl bg-teal text-white text-sm font-semibold cursor-pointer hover:bg-teal-dark"
        >
          Confirm booking
        </button>
      </div>
    </Dialog>
  )
}
