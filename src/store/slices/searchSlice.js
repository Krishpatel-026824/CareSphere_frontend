import { createSlice } from '@reduxjs/toolkit'
import { generateSearchData } from '../../data/generators/searchGenerator'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    ...generateSearchData(),
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    clearRecentSearches(state) {
      state.recentSearches = []
    },
  },
})

export const { setQuery, clearRecentSearches } = searchSlice.actions
export default searchSlice.reducer
