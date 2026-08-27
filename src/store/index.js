import { configureStore } from '@reduxjs/toolkit'
import appointmentsReducer from './slices/appointmentsSlice'
import authReducer from './slices/authSlice'
import doctorScheduleReducer from './slices/doctorScheduleSlice'
import doctorsReducer from './slices/doctorsSlice'
import healthReducer from './slices/healthSlice'
import labReducer from './slices/labSlice'
import medicinesReducer from './slices/medicinesSlice'
import messagesReducer from './slices/messagesSlice'
import notificationsReducer from './slices/notificationsSlice'
import pharmacyReducer from './slices/pharmacySlice'
import doctorPatientAuditReducer from './slices/doctorPatientAuditSlice'
import doctorPatientRxReducer from './slices/doctorPatientRxSlice'
import doctorPatientLabsReducer from './slices/doctorPatientLabsSlice'
import doctorSignedRxReducer from './slices/doctorSignedRxSlice'
import profileReducer from './slices/profileSlice'
import searchReducer from './slices/searchSlice'
import telemedicineReducer from './slices/telemedicineSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentsReducer,
    doctors: doctorsReducer,
    doctorSchedule: doctorScheduleReducer,
    health: healthReducer,
    medicines: medicinesReducer,
    messages: messagesReducer,
    notifications: notificationsReducer,
    pharmacy: pharmacyReducer,
    doctorSignedRx: doctorSignedRxReducer,
    doctorPatientLabs: doctorPatientLabsReducer,
    doctorPatientRx: doctorPatientRxReducer,
    doctorPatientAudit: doctorPatientAuditReducer,
    profile: profileReducer,
    lab: labReducer,
    telemedicine: telemedicineReducer,
    search: searchReducer,
  },
})
