import React, { useState } from 'react'

import { TextField, Box } from '@mui/material'
import { FormikProvider, useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { NavLink, Navigate } from 'react-router-dom'

import { ShowPassword } from '../../../common/c10-ShowPassword/ShowPassword'
import { setRegistrationTC, useAppDispatch } from '../../../reducers/signup-reducer'
import { AppRootStateType } from '../../../store/store'
import { PATH } from '../../Pages'

import { Input } from './Input/Input'
import s from './singUp.module.css'

export type initialValuesType = {
  email: string
  password: string
  confirmPassword: string
}

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)
  const [typeInputPassword, setTypeP] = useState<string>('password')
  const [typeInputConfirmPassword, setTypeCP] = useState<string>('password')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
      if (values.password !== values.confirmPassword) {
        return {
          confirmPassword: 'Passwords does not match',
        }
      }
    },
    onSubmit: values => {
      dispatch(setRegistrationTC(values.email, values.password))
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
          <h1>Sing Up</h1>
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
            <TextField
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              label={'ConfirmPassword'}
              variant="standard"
              type={typeInputConfirmPassword}
              defaultValue={formik.errors.confirmPassword}
              helperText={formik.errors.confirmPassword}
              {...formik.getFieldProps('confirmPassword')}
            />
            <ShowPassword value={typeInputConfirmPassword} callback={setTypeCP} />
          </div>
          <button className={s.button} type={'submit'}>
            Sing Up
          </button>
          <h5> Already have an account?</h5>
          <div className={s.link}>
            <NavLink to={PATH.LOGIN}>Sing In</NavLink>
          </div>
        </form>
      </Box>
    </div>
  )
}

// Подумать
/*
<Input field="Email" type="email" callback={setTypeP} />
<Input
    field="Password"
    type={typeInputPassword}
    callback={setTypeP}
    showPassword={true}
/>
<Input
    field="CdonfirmPassword"
    type={typeInputConfirmPassword}
    callback={setTypeCP}
    showPassword={true}
/>*/
