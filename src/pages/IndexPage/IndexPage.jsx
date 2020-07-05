import React from 'react'
import { QueryForm } from '../../components/QueryForm'
import { Results } from '../../components/Results'
import { Pagination } from '../../components/Pagination'

export const IndexPage = () => (
  <div>
    <QueryForm />
    <Results />
    <Pagination />
  </div>
)
