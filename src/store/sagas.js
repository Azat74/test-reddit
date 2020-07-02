import { takeEvery, all, call, getContext } from 'redux-saga/effects'
import { login as LoginAction } from './auth'
import auth from './auth/saga'

function* fetchUsers() {
  const axios = yield getContext('axios')
  const users = yield axios.get('users?page=2')

  console.log(users)
}

function* mySaga() {
  yield takeEvery(LoginAction, fetchUsers)
}

export default function* () {
  return yield all([
    // call(mySaga),
    call(auth),
  ])
}
