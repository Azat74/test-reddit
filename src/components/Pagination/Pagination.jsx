import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import classnames from 'classnames/bind'

import css from './Pagination.module.css'
import { selectBeforeIsActive, selectAfterID, search } from '../../store/search'

const cn = classnames.bind(css)

export const Pagination = () => {
  const dispatch = useDispatch()
  const prevSelector = useSelector(selectBeforeIsActive)
  const nextSelector = useSelector(selectAfterID)

  return (
    <div className={cn('pagination')}>
      <Button
        type="button"
        className={cn('button')}
        color="primary"
        disabled={!prevSelector}
        onClick={() => dispatch(search({ isPrev: true }))}
      >
        Prev
      </Button>
      <Button
        type="button"
        className={cn('button')}
        color="primary"
        disabled={!nextSelector}
        onClick={() => dispatch(search({ isNext: true }))}
      >
        Next
      </Button>
    </div>
  )
}
