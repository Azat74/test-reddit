import { all, takeEvery, put, getContext } from 'redux-saga/effects'
import { login as loginAction, setLogin, setError } from './index'

function* handleLogin(action) {
  const axios = yield getContext('axios')
  const { login, password } = action.payload

  try {
    const response = yield axios.post('/register/', {
      email: login,
      password: password,
    })
    const { id, token } = response.data

    yield put(setLogin({ id, token }))
  } catch (e) {
    const { error } = e.response.data

    yield put(setError({ error }))
  }
}

export default function* () {
  return yield all([takeEvery(loginAction, handleLogin)])
}
