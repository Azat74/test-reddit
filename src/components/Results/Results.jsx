import React from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames/bind'
import { selectPosts } from '../../store/search'
import css from './Results.module.css'

const cn = classnames.bind(css)

export const Results = () => {
  const posts = useSelector(selectPosts)

  return (
    <div className={cn('results')}>
      {posts.map(({ title, id, url, author_fullname, created }) => (
        <div key={id} className={cn('item')}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn('link')}
          >
            {title}
          </a>
          <div className={cn('bottomWrapper')}>
            <span className={cn('author')}>{author_fullname}</span>
            <span className={cn('date')}>{created}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
