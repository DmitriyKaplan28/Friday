import React, { useState } from 'react'

import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { AppRootStateType, useAppDispatch } from '../../store/store'
import { PATH } from '../Pages'
import s from '../pages/ComonnStylePage.module.css'

export const ResetPassword = () => {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
  const [typeInputPassword, setTypeP] = useState<string>('password')

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
      alert(() => {
        'onSubmit'
      })
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
            <NavLink to={PATH.SIGNUP}>Sing Up</NavLink>
          </div>
        </form>
      </Box>
    </div>
  )
}
