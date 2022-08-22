import { FormControl, FormGroup, FormLabel, Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { PATH } from '../Pages'
import { setRegistrationTC, useAppDispatch } from '../../reducers/signup-reducer'

function SignUp() {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    validate: (values) => {},
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
              <TextField
                type="password"
                label="Confirm password"
                margin="normal"
                {...formik.getFieldProps('confirmPassword')}
              />
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
