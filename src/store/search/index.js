import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    posts: [],
    beforeID: '',
    afterID: '',
    queryName: '',
    firstItemID: '',
    isLock: false,
    error: '',
  },
  reducers: {
    sendQuery: (state) => {
      return {
        ...state,
        error: '',
        isLock: true,
      }
    },
    sendQuerySuccess: (state, action) => {
      const { posts } = action.payload

      return {
        ...state,
        isLock: false,
        posts,
      }
    },
    sendQueryFailed: (state) => {
      return {
        ...state,
        isLock: false,
        error: 'Неправильный запрос',
      }
    },
    setQuery: (state, action) => {
      const { queryName } = action.payload

      return {
        ...state,
        queryName,
      }
    },
    setBeforeID: (state, action) => {
      const { beforeID } = action.payload

      return {
        ...state,
        beforeID,
      }
    },
    setAfterID: (state, action) => {
      const { afterID } = action.payload

      return {
        ...state,
        afterID,
      }
    },
    setFirstItemID: (state, action) => {
      const { firstItemID } = action.payload

      return {
        ...state,
        firstItemID,
      }
    },
    clearError: (state) => ({
      ...state,
      error: '',
    }),
  },
})

export const {
  sendQuery,
  logout,
  sendQuerySuccess,
  sendQueryFailed,
  setBeforeID,
  setAfterID,
  setQuery,
  setFirstItemID,
  clearError,
} = searchSlice.actions

export const selectPosts = (state) => state.search.posts
export const selectBeforeID = (state) => state.search.beforeID
export const selectAfterID = (state) => state.search.afterID
export const selectBeforeIsActive = (state) =>
  state.search.beforeID !== state.search.firstItemID
export const selectQuery = (state) => state.search.queryName
export const selectIsLock = (state) => state.search.isLock
export const selectError = (state) => state.search.error

export default searchSlice.reducer
