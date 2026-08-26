import { useMemo, useState } from 'react'
import { Eye, Search, Trash2 } from 'lucide-react'
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
import { getPatientAppointmentStatusLabel, getPatientAppointmentStatusStyle } from '../../data/mocks/appointmentActions'
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
      <div className="w-full min-h-full bg-bg-gray">
        <div className="page-pad py-4 sm:py-5 flex flex-col gap-4 max-w-[1440px] mx-auto">
        <AppointmentPageHeader
          count={appointments.length}
          upcomingCount={countUpcomingAppointments(appointments)}
          onNewAppointment={openBookingModal}
          onClearAll={() => setShowRecycleBin(true)}
          recycleBinCount={recycleBin.length}
        />

        <section className="bg-white rounded-2xl border border-[#E6EBF1] shadow-sm overflow-hidden">
          <div className="px-4 sm:px-5 py-3 border-b border-[#E6EBF1] bg-[#F8FAFC]">
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

          <div className="overflow-x-auto">
            {filtered.length === 0 ? (
              <p className="m-4 sm:m-5 rounded-xl border border-border-gray bg-[#F8FAFC] p-6 text-sm text-body-gray text-center">
                No appointments found for this filter.
              </p>
            ) : (
              <table className="w-full min-w-[780px] border-collapse text-left">
                <thead className="bg-[#CBD5E1]">
                  <tr>
                    <th className="px-3 py-4 w-14 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      No.
                    </th>
                    <th className="px-4 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      Doctor
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle hidden md:table-cell">
                      Specialty
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle hidden lg:table-cell">
                      Clinic
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle whitespace-nowrap">
                      Time
                    </th>
                    <th className="px-3 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 border-r border-[#94A3B8] text-center align-middle">
                      Status
                    </th>
                    <th className="px-3 py-4 w-16 text-[13px] font-bold uppercase tracking-[0.06em] text-navy border-b-2 text-center align-middle">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((appointment, index) => (
                    <tr key={appointment.id} className="hover:bg-[#F0FDFA] transition-colors">
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                        <span className="text-[13px] font-semibold text-navy tabular-nums">{index + 1}</span>
                      </td>
                      <td className="px-4 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                        <div className="flex items-center gap-3 min-w-0">
                          <Avatar
                            src={appointment.doctorPhoto}
                            alt={appointment.doctorName}
                            sx={{ width: 40, height: 40, flexShrink: 0 }}
                          />
                          <p className="text-sm font-semibold text-navy truncate leading-snug">
                            {appointment.doctorName}
                          </p>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle hidden md:table-cell">
                        <p className="text-[13px] text-body-gray truncate">{appointment.specialty}</p>
                      </td>
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle hidden lg:table-cell">
                        <p className="text-[13px] text-body-gray truncate">{appointment.clinic}</p>
                      </td>
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                        <p className="text-[13px] font-semibold text-navy whitespace-nowrap">{appointment.dateLabel}</p>
                      </td>
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] align-middle">
                        <p className="text-[13px] font-semibold text-navy whitespace-nowrap">{appointment.timeLabel}</p>
                      </td>
                      <td className="px-3 py-3.5 border-b border-r border-[#D5DEE8] text-center align-middle">
                        <span
                          className={`inline-flex text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                            getPatientAppointmentStatusStyle(appointment.status)
                          }`}
                        >
                          {getPatientAppointmentStatusLabel(appointment.status)}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 border-b border-[#D5DEE8] text-center align-middle">
                        <button
                          type="button"
                          onClick={() => setSelectedAppointmentDetail(appointment)}
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-navy/65 hover:text-teal hover:bg-teal-light/60 cursor-pointer transition-colors"
                          aria-label="View appointment"
                        >
                          <Eye className="w-5 h-5" strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
