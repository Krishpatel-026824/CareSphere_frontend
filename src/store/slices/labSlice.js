import { createSlice } from '@reduxjs/toolkit'
import { generateLabTestsData } from '../../data/generators/quickActionsGenerator'

const labSlice = createSlice({
  name: 'lab',
  initialState: {
    tests: generateLabTestsData().tests,
    cart: {},
    paymentMethod: 'upi',
    paid: false,
    reports: [],
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
  },
})

export const { bookTest, removeTest, setPaymentMethod, payBill } = labSlice.actions

export default labSlice.reducer
