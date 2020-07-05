import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form as FormStrap, Label, Input } from 'reactstrap'
import {
  sendQuery,
  selectIsLock,
  selectError,
  clearError,
} from '../../store/search'

export const QueryForm = () => {
  const dispatch = useDispatch()
  const isLock = useSelector(selectIsLock)
  const errorText = useSelector(selectError)
  const handleChange = (e, onChange) => {
    dispatch(clearError())
    onChange(e)
  }

  return (
    <Form
      onSubmit={(e) => {
        dispatch(sendQuery(e))
      }}
      validate={() => {
        if (errorText) {
          return {
            queryName: errorText,
          }
        }

        return undefined
      }}
      render={({ handleSubmit, submitting, pristine, values }) => {
        return (
          <FormStrap onSubmit={handleSubmit}>
            <Field name="queryName">
              {({ input, meta }) => {
                const { onChange, ...restInput } = input

                return (
                  <Label>
                    <span>Name</span>
                    <Input
                      {...restInput}
                      onChange={(e) => handleChange(e, onChange)}
                      type="text"
                      placeholder="name"
                      invalid={meta.error && meta.touched}
                      autoComplete="off"
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Label>
                )
              }}
            </Field>
            <div>
              <Button
                type="submit"
                disabled={
                  submitting ||
                  pristine ||
                  isLock ||
                  (values[Object.keys(values)[0]] &&
                    values[Object.keys(values)[0]].length < 3)
                }
                color="primary"
              >
                Show
              </Button>
            </div>
          </FormStrap>
        )
      }}
    />
  )
}
