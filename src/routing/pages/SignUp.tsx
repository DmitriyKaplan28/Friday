import {
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
} from '@mui/material'
import CardActions from '@mui/material/CardActions'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { PATH } from '../Pages'
import { setRegistrationTC, useAppDispatch, useAppSelector } from '../../reducers/signup-reducer'
import { Navigate } from 'react-router-dom'
import s from './singUp.module.css'

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
          confirmPassword: 'Password does not match',
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
    <>
      <Card className={s.card}>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>
                <h1>Sing Up</h1>
              </FormLabel>
              <FormGroup>
                <TextField
                  type="email"
                  label="Email"
                  margin="normal"
                  {...formik.getFieldProps('email')}
                />
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <TextField
                  type="password"
                  label="Confirm password"
                  margin="normal"
                  {...formik.getFieldProps('confirmPassword')}
                />
                {formik.errors.confirmPassword ? <div>{formik.errors.confirmPassword}</div> : null}
                <Button
                  className={s.button}
                  type={'submit'}
                  variant={'contained'}
                  color={'primary'}
                >
                  Sing Up
                </Button>
                <h5> Already have an account?</h5>
              </FormGroup>
            </FormControl>
          </form>
        </CardContent>
        <CardActions>
          <Box className={s.link}>
            <NavLink to={PATH.LOGIN}>Sing In</NavLink>
          </Box>
        </CardActions>
      </Card>
    </>
  )
}
