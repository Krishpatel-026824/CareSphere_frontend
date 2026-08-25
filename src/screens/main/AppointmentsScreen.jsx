import { useMemo, useState } from 'react'
import { CalendarDays, Clock, Pencil, Search, Star, Trash2 } from 'lucide-react'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AppointmentPageHeader from '../../components/appointments/AppointmentPageHeader'
import AppointmentRecordDetailModal from '../../components/appointments/AppointmentRecordDetailModal'
import AppointmentRecycleBinModal from '../../components/appointments/AppointmentRecycleBinModal'
import DoctorProfileModal from '../../components/appointments/DoctorProfileModal'
import NewAppointmentModal from '../../components/appointments/NewAppointmentModal'
import EditAppointmentModal from '../../components/home/EditAppointmentModal'
import { appointmentStatusStyles } from '../../data/mocks/appointmentActions'
import { countUpcomingAppointments, parseAppointmentDate, sortAppointmentsForList } from '../../utils/appointmentFormat'

export default function AppointmentsScreen({
  appointments = [],
  doctors = [],
  doctorCategories = [],
  currentUserName = 'Krish Patel',
  onCreateAppointment,
  onUpdateAppointment,
  onDeleteAppointment,
  recycleBin = [],
  onRestoreAppointment,
  onPermanentDeleteAppointment,
  onEmptyRecycleBin,
}) {
  const [query, setQuery] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [category, setCategory] = useState('All categories')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedAppointmentDetail, setSelectedAppointmentDetail] = useState(null)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [showDoctorProfileModal, setShowDoctorProfileModal] = useState(false)
  const [showRecycleBin, setShowRecycleBin] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [booking, setBooking] = useState({
    fullName: currentUserName || 'Krish Patel',
    mobile: '',
    appointmentDate: null,
    timeSlot: '',
    category: doctorCategories[0] || '',
    doctorId: '',
    note: '',
  })
  const [errors, setErrors] = useState({})

  const modalCategories = useMemo(
    () => (doctorCategories.length ? doctorCategories : [...new Set(doctors.map((item) => item.specialty))]),
    [doctorCategories, doctors],
  )
  const doctorsByCategory = useMemo(() => {
    if (!booking.category) return doctors
    return doctors.filter((item) => item.specialty === booking.category)
  }, [booking.category, doctors])
  const selectedDoctor = useMemo(
    () => doctors.find((item) => item.id === booking.doctorId) || null,
    [booking.doctorId, doctors],
  )
  const availableTimes = [
    '09:00 - 10:00 AM', '10:00 - 11:00 AM', '11:00 - 12:00 PM',
    '12:00 - 01:00 PM', '01:00 - 02:00 PM', '02:00 - 03:00 PM',
    '03:00 - 04:00 PM', '04:00 - 05:00 PM', '05:00 - 06:00 PM',
  ]

  const list = useMemo(() => sortAppointmentsForList(appointments), [appointments])
  const selectedDoctorProfile = useMemo(
    () => doctors.find((item) => item.id === selectedAppointmentDetail?.doctorId) || null,
    [doctors, selectedAppointmentDetail?.doctorId],
  )
  const categories = useMemo(
    () => ['All categories', ...modalCategories],
    [modalCategories],
  )
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const start = startDate ? startDate.startOf('day').toDate() : null
    const end = endDate ? endDate.endOf('day').toDate() : null

    return list.filter((item) => {
      const matchesQuery =
        !q ||
        item.doctorName?.toLowerCase().includes(q) ||
        item.specialty?.toLowerCase().includes(q) ||
        item.clinic?.toLowerCase().includes(q)
      if (!matchesQuery) return false

      if (category !== 'All categories' && item.specialty !== category) return false

      const when = parseAppointmentDate(item.dateLabel, item.timeLabel)
      if (start && when && when < start) return false
      if (end && when && when > end) return false
      return true
    })
  }, [category, endDate, list, query, startDate])

  function openBookingModal() {
    setBooking({
      fullName: currentUserName || 'Krish Patel',
      mobile: '',
      appointmentDate: null,
      timeSlot: '',
      category: modalCategories[0] || '',
      doctorId: '',
      note: '',
    })
    setErrors({})
    setShowBookingModal(true)
  }

  function validateBookingForm() {
    const next = {}
    if (!booking.fullName.trim()) next.fullName = 'Full name is required'
    if (!/^\+?\d[\d\s-]{8,14}$/.test(booking.mobile.trim())) next.mobile = 'Enter a valid mobile number'
    if (!booking.appointmentDate) next.appointmentDate = 'Appointment date is required'
    if (!booking.timeSlot) next.timeSlot = 'Time slot is required'
    if (!booking.category) next.category = 'Category is required'
    if (!booking.doctorId) next.doctorId = 'Doctor selection is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSaveBooking() {
    if (!validateBookingForm()) return
    if (!selectedDoctor) return
    onCreateAppointment?.({
      doctor: selectedDoctor,
      selectedDate: booking.appointmentDate.format('YYYY-MM-DD'),
      selectedTime: booking.timeSlot,
      appointmentId: `CSAP${Date.now().toString().slice(-8)}`,
      patientName: booking.fullName.trim(),
      mobile: booking.mobile.trim(),
      note: booking.note.trim(),
    })
    setShowBookingModal(false)
  }

  function updateBooking(next) {
    setBooking((prev) => ({ ...prev, ...next }))
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full min-h-full lg:h-[100dvh] lg:max-h-[100dvh] bg-bg-gray flex flex-col overflow-x-hidden lg:overflow-hidden">
        <div className="flex-1 min-h-0 page-pad py-4 sm:py-5 flex flex-col gap-4">
        <AppointmentPageHeader
          count={appointments.length}
          upcomingCount={countUpcomingAppointments(appointments)}
          onNewAppointment={openBookingModal}
          onClearAll={() => setShowRecycleBin(true)}
          recycleBinCount={recycleBin.length}
        />

        <section className="flex-1 min-h-0 bg-white rounded-2xl border border-[#E6EBF1] shadow-sm flex flex-col overflow-hidden">
          <div className="shrink-0 px-4 sm:px-5 py-3 border-b border-[#E6EBF1]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] gap-2.5 items-end">
              <div>
                <span className="text-[11px] font-semibold text-[#374151] mb-1 block">Search</span>
                <TextField
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Doctor, clinic, category..."
                  size="small"
                  fullWidth
                  sx={muiFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="w-4 h-4 text-body-gray shrink-0" strokeWidth={1.8} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#374151] mb-1 block">Start date</span>
                <DatePicker
                  value={startDate}
                  onChange={(value) => setStartDate(value)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  sx={muiFieldSx}
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#374151] mb-1 block">End date</span>
                <DatePicker
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  sx={muiFieldSx}
                />
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#374151] mb-1 block">Category</span>
                <Select
                  fullWidth
                  size="small"
                  displayEmpty
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  sx={{ ...muiFieldSx['& .MuiOutlinedInput-root'], borderRadius: '0.75rem' }}
                  renderValue={(v) => v || 'All categories'}
                >
                  {categories.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4">
            {filtered.length === 0 ? (
              <p className="rounded-xl border border-border-gray bg-[#F8FAFC] p-4 text-sm text-body-gray">
                No appointments found for this filter.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {filtered.map((appointment) => (
                  <article
                    key={appointment.id}
                    onClick={() => setSelectedAppointmentDetail(appointment)}
                    className="rounded-xl border border-[#E6EBF1] bg-[#FAFBFC] hover:bg-white px-4 py-3 flex items-start justify-between gap-3 cursor-pointer"
                  >
                    <div className="min-w-0 flex items-start gap-3">
                      <Avatar
                        src={appointment.doctorPhoto}
                        alt={appointment.doctorName}
                        sx={{ width: 44, height: 44, mt: 0.3 }}
                      />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-navy truncate">{appointment.doctorName}</h3>
                        <p className="text-xs text-body-gray mt-0.5 truncate">
                        {appointment.specialty} • {appointment.clinic}
                        </p>
                        <p className="text-xs text-body-gray mt-1.5 flex items-center gap-3">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
                            {appointment.dateLabel}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-teal" strokeWidth={1.75} />
                            {appointment.timeLabel}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                            appointmentStatusStyles[appointment.status] || appointmentStatusStyles.Upcoming
                          }`}
                        >
                          {appointment.status}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setEditingAppointment(appointment)
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-teal hover:bg-teal-light cursor-pointer transition-colors"
                          aria-label="Edit appointment"
                        >
                          <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(appointment.id) }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
                          aria-label="Delete appointment"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                      </div>
                      <span className="text-[11px] text-body-gray inline-flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500" strokeWidth={1.9} />
                        {doctors.find((item) => item.id === appointment.doctorId)?.rating || '--'}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
        </div>
        <NewAppointmentModal
          open={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          booking={booking}
          errors={errors}
          modalCategories={modalCategories}
          doctorsByCategory={doctorsByCategory}
          doctors={doctors}
          availableTimes={availableTimes}
          onChange={updateBooking}
          onSave={handleSaveBooking}
        />

        <EditAppointmentModal
          open={Boolean(editingAppointment)}
          appointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSave={(updated) => {
            onUpdateAppointment?.(updated)
            setEditingAppointment(null)
            if (selectedAppointmentDetail?.id === updated.id) {
              setSelectedAppointmentDetail(updated)
            }
          }}
        />

        <AppointmentRecordDetailModal
          open={Boolean(selectedAppointmentDetail)}
          appointment={selectedAppointmentDetail}
          doctor={selectedDoctorProfile}
          onClose={() => setSelectedAppointmentDetail(null)}
          onOpenDoctor={() => setShowDoctorProfileModal(true)}
        />

        <DoctorProfileModal
          open={showDoctorProfileModal}
          appointment={selectedAppointmentDetail}
          doctor={selectedDoctorProfile}
          onClose={() => setShowDoctorProfileModal(false)}
        />

        <Dialog open={Boolean(deleteConfirmId)} onClose={() => setDeleteConfirmId(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '14px' } }}>
          <div className="p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-5 h-5" strokeWidth={2} />
            </div>
            <h3 className="text-[15px] font-bold text-navy mb-1">Delete appointment?</h3>
            <p className="text-[13px] text-body-gray mb-5">This will move the appointment to the recycle bin. You can recover it later.</p>
            <div className="flex gap-3">
              <button type="button" onClick={() => setDeleteConfirmId(null)} className="flex-1 h-10 rounded-xl border border-[#E6EBF1] text-navy text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="button" onClick={() => { onDeleteAppointment?.(deleteConfirmId); setDeleteConfirmId(null) }} className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-semibold cursor-pointer hover:bg-red-600 transition-colors">Delete</button>
            </div>
          </div>
        </Dialog>

        <AppointmentRecycleBinModal
          open={showRecycleBin}
          onClose={() => setShowRecycleBin(false)}
          recycleBin={recycleBin}
          onRestore={onRestoreAppointment}
          onPermanentDelete={onPermanentDeleteAppointment}
          onEmptyAll={onEmptyRecycleBin}
        />
      </div>
    </LocalizationProvider>
  )
}

const muiFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '0.75rem',
    backgroundColor: '#FFFFFF',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
  },
}
