import { all, takeEvery, put, getContext, select } from 'redux-saga/effects'
import {
  search,
  setPosts,
  setBeforeID,
  setAfterID,
  setQuery,
  selectQuery,
  selectBeforeID,
  selectAfterID,
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

  const { queryName, isPrev, isNext } = action.payload

  if (queryName) {
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
      `r/${currentQueryName}/hot.json?limit=10${prevArg}${nextArg}`,
    )

    const { children } = response.data.data

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

    yield put(setPosts({ posts: postsWithAuthorNormalized }))
  } catch (e) {
    console.error(e)
  }
}

export default function* () {
  return yield all([takeEvery(search, handleSearch)])
}
