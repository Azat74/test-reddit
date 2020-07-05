import { all, takeEvery, put, getContext } from 'redux-saga/effects'
import { search, setPosts, setBeforeID, setAfterID } from './index'
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

  const { queryName } = action.payload

  try {
    const response = yield axios.get(`r/${queryName}/hot.json?limit=10`)

    const { children } = response.data.data

    yield put(
      setBeforeID({
        beforeID: response.data.data.before ? response.data.data.before : '',
      }),
    )

    yield put(
      setAfterID({
        afterID: response.data.data.after ? response.data.data.after : '',
      }),
    )

    const posts = children.map(({ data }) => {
      const { title, id, url, author, author_fullname, created } = data

      return {
        title,
        id,
        url,
        author,
        author_fullname,
        created: formatDate(created),
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
    // const { error } = e.response.data
    console.error(e)

    // yield put(setError({ error }))
  }
}

export default function* () {
  return yield all([takeEvery(search, handleSearch)])
}
