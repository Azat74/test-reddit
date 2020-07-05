import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form as FormStrap, Label, Input } from 'reactstrap'
import { search, setQuery } from '../../store/search'

export const QueryForm = () => {
  const dispatch = useDispatch()
  // const error = useSelector(selectErrorAction)

  return (
    <Form
      onSubmit={(e) => {
        dispatch(setQuery({ queryString: e.queryName }))
        dispatch(search(e))
      }}
      /*
      validate={(values) => {
        const errors = {}

        if (!values.login) {
          errors.login = 'Required'
        }
        if (!values.password) {
          errors.password = 'Required'
        }
        return errors
      }}
      */
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
            {/* {error && <div>{error}</div>} */}
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
