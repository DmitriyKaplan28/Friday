import React, { useState } from 'react'

import { Box, Checkbox, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { ShowPassword } from '../../common/c10-ShowPassword/ShowPassword'
import { loginTC } from '../../reducers/auth-reducer'
import { AppRootStateType, useAppDispatch } from '../../store/store'
import { PATH } from '../Pages'
import s from '../pages/ComonnStylePage.module.css'

export const Login = () => {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
  const [typeInputPassword, setTypeP] = useState<string>('password')

  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
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
      if (values.password.length < 8) {
        return {
          password: 'Password must be more than 7 characters',
        }
      }
    },

    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <div className={s.card}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '347px' },
        }}
      >
        <form method="post" onSubmit={formik.handleSubmit}>
          <h1>Sing In</h1>
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
          <div className={s.input}>
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              label={'Password'}
              variant="standard"
              type={typeInputPassword}
              defaultValue={formik.errors.password}
              helperText={formik.errors.password}
              {...formik.getFieldProps('password')}
            />
            <ShowPassword value={typeInputPassword} callback={setTypeP} />
          </div>
          <div className={s.input}>
            <Checkbox {...formik.getFieldProps('rememberMe')} /> Remember me
          </div>
          <div className={s.forgot}>
            <NavLink to={PATH.RESET_PASSWORD}>Forgot Password?</NavLink>
          </div>
          <button className={s.button} type={'submit'}>
            Sing In
          </button>
          <h5> Already have an account?</h5>
          <div className={s.link}>
            <NavLink to={PATH.SIGNUP}>Sing Up</NavLink>
          </div>
        </form>
      </Box>
    </div>
  )
}
