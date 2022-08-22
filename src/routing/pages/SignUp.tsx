import { FormControl, FormGroup, FormLabel, Grid, TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import { PATH } from '../Pages'

function SignUp() {
  const formik = useFormik({
    validate: (values) => {},
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {},
  })
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
              <TextField type="password" label="Password" margin="normal" />
              <TextField type="password" label="Confirm password" margin="normal" />
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
