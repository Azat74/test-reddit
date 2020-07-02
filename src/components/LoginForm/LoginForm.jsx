import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form as FormStrap, FormGroup, Label, Input } from 'reactstrap'
import { login as loginAction, selectError } from '../../store/auth'

export const LoginForm = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectError)

  return (
    <Form
      onSubmit={(e) => dispatch(loginAction(e))}
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
      render={({ handleSubmit, submitting, pristine, values }) => {
        return (
          <FormStrap onSubmit={handleSubmit}>
            <FormGroup>
              <Field name="login">
                {({ input, meta }) => (
                  <Label>
                    <span>Email</span>
                    <Input
                      {...input}
                      type="text"
                      placeholder="login"
                      invalid={meta.error && meta.touched}
                      onInvalidCapture={meta.error && meta.touched}
                    />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Label>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field name="password">
                {({ input, meta }) => (
                  <Label>
                    <span>Password</span>
                    <Input {...input} type="password" placeholder="password" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </Label>
                )}
              </Field>
            </FormGroup>
            {error && <div>{error}</div>}
            <Button
              type="submit"
              disabled={
                submitting || pristine || Object.keys(values).length < 2
              }
              color="primary"
            >
              Submit
            </Button>
          </FormStrap>
        )
      }}
    />
  )
}

LoginForm.propTypes = {
  loginAction: PropTypes.func,
}
