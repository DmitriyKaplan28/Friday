import { FormControl, FormGroup, FormLabel, Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { PATH } from '../Pages'
import {
  registerAPI,
  setRegistrationTC,
  useAppDispatch,
  useAppSelector,
} from '../../reducers/signup-reducer'
import { Navigate } from 'react-router-dom'

function SignUp() {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector<boolean>((state) => state.login.isLogin)
  const error = useAppSelector<string | undefined>((state) => state.register.error)
  const formik = useFormik({
    validate: (values) => {
      if (values.password.length < 8) {
        return {
          password: 'Password must be more than 7 characters...',
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
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <h1>Sing Up</h1>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
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
              {error && <div>{error}</div>}
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Sing Up
              </Button>
              <h5> Already have an account?</h5>
              <NavLink to={PATH.LOGIN}>Sing In</NavLink>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
export default SignUp
