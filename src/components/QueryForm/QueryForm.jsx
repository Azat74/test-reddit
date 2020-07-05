import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { Button, Form as FormStrap, Label, Input } from 'reactstrap'
import { search } from '../../store/search'

export const QueryForm = () => {
  const dispatch = useDispatch()

  return (
    <Form
      onSubmit={(e) => dispatch(search(e))}
      render={({ handleSubmit, submitting, pristine }) => {
        return (
          <FormStrap onSubmit={handleSubmit}>
            <Field name="queryName">
              {({ input, meta }) => {
                const { onChange, ...restInput } = input
                const handleChange = (e) => {
                  onChange(e)
                }

                return (
                  <Label>
                    <span>Name</span>
                    <Input
                      {...restInput}
                      onChange={handleChange}
                      type="text"
                      placeholder="name"
                      invalid={meta.error && meta.touched}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Label>
                )
              }}
            </Field>
            <div>
              <Button
                type="submit"
                disabled={submitting || pristine}
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
