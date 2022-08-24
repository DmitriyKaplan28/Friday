import { TextField, Box } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../Pages'
import { setRegistrationTC, useAppDispatch, useAppSelector } from '../../../reducers/signup-reducer'
import { Navigate } from 'react-router-dom'
import s from './singUp.module.css'
import { Input } from './Input/Input'

export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector<boolean>((state) => state.login.isLogin)
  const formik = useFormik({
    validate: (values) => {
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
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      dispatch(setRegistrationTC(values.email, values.password))
    },
  })
  if (isLogin) {
    return <Navigate to={'/login'} />
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
          <Input name="email" />
          <div className={s.input}>
            {!formik.errors.email ? (
              <TextField
                sx={{
                  '& .MuiTextField-root': { m: 8, width: '450px' },
                }}
                label="Email"
                variant="standard"
                type="email"
                {...formik.getFieldProps('email')}
              />
            ) : (
              <TextField
                error
                label="Error"
                variant="standard"
                defaultValue={formik.errors.email}
                helperText={formik.errors.email}
                {...formik.getFieldProps('email')}
              />
            )}
          </div>
          <div className={s.input}>
            {!formik.errors.password ? (
              <TextField
                label="Password"
                variant="standard"
                type="password"
                {...formik.getFieldProps('password')}
              />
            ) : (
              <TextField
                error
                label="Error"
                variant="standard"
                type="password"
                defaultValue={formik.errors.password}
                helperText={formik.errors.password}
                {...formik.getFieldProps('password')}
              />
            )}
          </div>
          <div className={s.input}>
            {!formik.errors.confirmPassword ? (
              <TextField
                label="Confirm Password"
                variant="standard"
                type="password"
                {...formik.getFieldProps('confirmPassword')}
              />
            ) : (
              <TextField
                error
                label="Error"
                variant="standard"
                type="password"
                defaultValue={formik.errors.confirmPassword}
                helperText={formik.errors.confirmPassword}
                {...formik.getFieldProps('confirmPassword')}
              />
            )}
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
