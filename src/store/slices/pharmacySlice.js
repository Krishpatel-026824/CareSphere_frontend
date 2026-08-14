import { createSlice } from '@reduxjs/toolkit'
import { generatePharmacyData } from '../../data/generators/quickActionsGenerator'

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState: {
    items: generatePharmacyData().items,
    cart: {},
    restockRequests: {},
    paymentMethod: 'upi',
    paid: false,
    catalogQuery: '',
    selectedFilters: [],
    selectedBrands: [],
  },
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload
      state.paid = false
      state.cart[itemId] = (state.cart[itemId] || 0) + 1
    },
    removeFromCart(state, action) {
      const itemId = action.payload
      state.paid = false
      const nextCount = (state.cart[itemId] || 0) - 1
      if (nextCount <= 0) delete state.cart[itemId]
      else state.cart[itemId] = nextCount
    },
    requestRestock(state, action) {
      state.restockRequests[action.payload] = true
    },
    restockItem(state, action) {
      const itemId = action.payload
      state.items = state.items.map((item) =>
        item.id === itemId ? { ...item, inStock: true } : item,
      )
      delete state.restockRequests[itemId]
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
    payBill(state) {
      state.paid = true
    },
    setCatalogQuery(state, action) {
      state.catalogQuery = action.payload
    },
    toggleCatalogFilter(state, action) {
      const id = action.payload
      state.selectedFilters = state.selectedFilters.includes(id)
        ? state.selectedFilters.filter((item) => item !== id)
        : [...state.selectedFilters, id]
    },
    toggleCatalogBrand(state, action) {
      const id = action.payload
      state.selectedBrands = state.selectedBrands.includes(id)
        ? state.selectedBrands.filter((item) => item !== id)
        : [...state.selectedBrands, id]
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  requestRestock,
  restockItem,
  setPaymentMethod,
  payBill,
  setCatalogQuery,
  toggleCatalogFilter,
  toggleCatalogBrand,
} = pharmacySlice.actions

export default pharmacySlice.reducer
