import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    posts: [],
    beforeID: '',
    afterID: '',
    queryName: '',
    firstItemID: '',
  },
  reducers: {
    search: () => {},
    setQuery: (state, action) => {
      const { queryName } = action.payload

      return {
        ...state,
        queryName,
      }
    },
    setPosts: (state, action) => {
      const { posts } = action.payload

      return {
        ...state,
        posts,
      }
    },
    setError: (state, action) => {
      const { error } = action.payload

      return {
        ...state,
        error: error,
      }
    },
    logout: () => {},
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
  },
})

export const {
  search,
  logout,
  setPosts,
  setError,
  setBeforeID,
  setAfterID,
  setQuery,
  setFirstItemID,
} = searchSlice.actions

export const selectPosts = (state) => state.search.posts
export const selectBeforeID = (state) => state.search.beforeID
export const selectAfterID = (state) => state.search.afterID
export const selectBeforeIsActive = (state) =>
  state.search.beforeID !== state.search.firstItemID
export const selectQuery = (state) => state.search.queryName

export default searchSlice.reducer
