import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: false,
    id: '',
    token: '',
    error: '',
  },
  reducers: {
    login: () => {},
    setLogin: (state, action) => {
      const { id, token } = action.payload

      return {
        ...state,
        auth: true,
        error: '',
        id,
        token,
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
  },
})

export const { login, logout, setLogin, setError } = authSlice.actions

export const selectAuth = (state) => state.auth.auth
export const selectError = (state) => state.auth.error

export default authSlice.reducer
