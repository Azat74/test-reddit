import { all, takeEvery, put, getContext, select } from 'redux-saga/effects'
import {
  sendQuery,
  sendQuerySuccess,
  sendQueryFailed,
  setBeforeID,
  setAfterID,
  setQuery,
  selectQuery,
  selectBeforeID,
  selectAfterID,
  setFirstItemID,
} from './index'
import { formatDate } from '../../helpers/index'

function* getFullname(ids) {
  const axios = yield getContext('axios')

  try {
    const response = yield axios.get(
      `api/user_data_by_account_ids.json?ids=${ids}`,
    )

    return response
  } catch (e) {
    console.error(e)
  }
}

function* handleSearch(action) {
  const axios = yield getContext('axios')
  let prevArg = ''
  let nextArg = ''
  let limit = 10

  const { queryName, isPrev, isNext } = action.payload

  if (queryName) {
    limit = 8
    yield put(
      setQuery({
        queryName,
      }),
    )
  }

  const currentQueryName = yield select(selectQuery)
  const currentBeforeID = yield select(selectBeforeID)
  const currentAfterID = yield select(selectAfterID)

  if (isPrev) {
    prevArg = `&before=${currentBeforeID}`
  }
  if (isNext) {
    nextArg = `&after=${currentAfterID}`
  }

  try {
    const response = yield axios.get(
      `r/${currentQueryName}/hot.json?limit=${limit}${prevArg}${nextArg}`,
    )

    const { children } = response.data.data

    if (queryName) {
      yield put(
        setFirstItemID({
          firstItemID: children[0].data.name ? children[0].data.name : '',
        }),
      )
    }

    yield put(
      setBeforeID({
        beforeID: children[0].data.name ? children[0].data.name : '',
      }),
    )

    yield put(
      setAfterID({
        afterID: children[children.length - 1].data.name
          ? children[children.length - 1].data.name
          : '',
      }),
    )

    const posts = children.map(({ data }) => {
      const { title, id, url, author, author_fullname, created_utc } = data

      return {
        title,
        id,
        url,
        author,
        author_fullname,
        created: formatDate(created_utc),
      }
    })

    const { data: authors } = yield getFullname(
      posts.map(({ author_fullname }) => author_fullname),
    )

    const postsWithAuthorNormalized = posts.map((item) => ({
      ...item,
      author_fullname: authors[item.author_fullname].name,
    }))

    yield put(sendQuerySuccess({ posts: postsWithAuthorNormalized }))
  } catch (e) {
    yield put(sendQueryFailed())
  }
}

export default function* () {
  return yield all([takeEvery(sendQuery, handleSearch)])
}
