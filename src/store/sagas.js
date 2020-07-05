import { all, call } from 'redux-saga/effects'
import search from './search/saga'

export default function* () {
  return yield all([
    // call(mySaga),
    call(search),
  ])
}
