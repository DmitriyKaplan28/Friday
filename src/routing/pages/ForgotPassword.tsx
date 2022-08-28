import React from 'react'

import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'

import { forgotPasswordTC } from '../../reducers/ForgotPasswordReducer'
import { useAppDispatch } from '../../store/store'
import { PATH } from '../Pages'
import s from '../pages/ComonnStylePage.module.css'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      if (!values.email) {
        return {
          email: 'Email is required',
        }
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: 'Invalid email address',
        }
      }
    },

    onSubmit: values => {
      dispatch(forgotPasswordTC(values.email))
    },
  })

  return (
    <div className={s.card}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '347px' },
        }}
      >
        <form method="post" onSubmit={formik.handleSubmit}>
          <h1>Forgot your password?</h1>
          <div className={s.input}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              label={'Email'}
              variant="standard"
              type={'email'}
              defaultValue={formik.errors.email}
              helperText={formik.errors.email}
              {...formik.getFieldProps('email')}
            />
          </div>
          <div className={s.text}>
            Enter your email address and we will send you further instructions
          </div>
          <button className={s.button} type={'submit'}>
            Send Instructions
          </button>
          <h5>Did you remember your password?</h5>
          <div className={s.link}>
            <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
          </div>
        </form>
      </Box>
    </div>
  )
}
