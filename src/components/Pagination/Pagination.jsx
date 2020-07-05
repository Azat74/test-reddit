import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import classnames from 'classnames/bind'
import css from './Pagination.module.css'
import { selectBeforeID, selectAfterID } from '../../store/search'

const cn = classnames.bind(css)

export const Pagination = () => {
  const dispatch = useDispatch()
  const prev = useSelector(selectBeforeID)
  const next = useSelector(selectAfterID)

  return (
    <div className={cn('pagination')}>
      <Button
        type="button"
        className={cn('button')}
        color="primary"
        disabled={!prev}
      >
        Prev
      </Button>
      <Button
        type="button"
        className={cn('button')}
        color="primary"
        disabled={!next}
      >
        Next
      </Button>
    </div>
  )
}
