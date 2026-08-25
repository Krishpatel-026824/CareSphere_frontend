import { createSlice } from '@reduxjs/toolkit'
import { generateLabTestsData } from '../../data/generators/quickActionsGenerator'
import {
  generateLabBookingFromForm,
  normalizeLabBooking,
} from '../../data/generators/labBookingsGenerator'

const STORAGE_KEY = 'caresphere.labBookings'
const LEGACY_KEY = 'labBookings'

function loadStored(key) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveBookingsToStorage(items) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    window.localStorage.removeItem(LEGACY_KEY)
  } catch {
    /* silently fail */
  }
}

function loadInitialBookings() {
  const modern = loadStored(STORAGE_KEY)
    .map(normalizeLabBooking)
    .filter(Boolean)
  if (modern.length) return modern

  return loadStored(LEGACY_KEY)
    .map(normalizeLabBooking)
    .filter(Boolean)
}

const labSlice = createSlice({
  name: 'lab',
  initialState: {
    tests: generateLabTestsData().tests,
    cart: {},
    paymentMethod: 'upi',
    paid: false,
    reports: [],
    bookings: loadInitialBookings(),
  },
  reducers: {
    bookTest(state, action) {
      state.paid = false
      state.cart[action.payload] = 1
    },
    removeTest(state, action) {
      state.paid = false
      state.reports = []
      delete state.cart[action.payload]
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
    payBill(state, action) {
      state.reports = action.payload || []
      state.paid = true
    },
    addLabBooking(state, action) {
      const booking = generateLabBookingFromForm(action.payload) || normalizeLabBooking(action.payload)
      if (!booking?.id) return
      if (state.bookings.some((item) => item.id === booking.id)) return
      state.bookings = [booking, ...state.bookings]
      saveBookingsToStorage(state.bookings)
    },
    removeLabBooking(state, action) {
      state.bookings = state.bookings.filter((item) => item.id !== action.payload)
      saveBookingsToStorage(state.bookings)
    },
  },
})

export const {
  bookTest,
  removeTest,
  setPaymentMethod,
  payBill,
  addLabBooking,
  removeLabBooking,
} = labSlice.actions

export const selectLabBookings = (state) => state.lab?.bookings ?? []

export default labSlice.reducer
