import { createSlice } from '@reduxjs/toolkit'
import { generateLabTestsData } from '../../data/generators/quickActionsGenerator'
import {
  generateLabBookingFromForm,
  normalizeLabBooking,
} from '../../data/generators/labBookingsGenerator'

const labSlice = createSlice({
  name: 'lab',
  initialState: {
    tests: generateLabTestsData().tests,
    cart: {},
    paymentMethod: 'upi',
    paid: false,
    reports: [],
    bookings: [],
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
    },
    removeLabBooking(state, action) {
      state.bookings = state.bookings.filter((item) => item.id !== action.payload)
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
