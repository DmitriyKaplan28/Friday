import React, { useState } from 'react'

import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { NavLink, useNavigate } from 'react-router-dom'

import { ShowPassword } from '../../../common/c10-ShowPassword/ShowPassword'
import img from '../../assets/forgot/Check.png'
import { forgotPasswordTC } from '../../reducers/ForgotPasswordReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { PATH } from '../Pages'
import s from '../pages/ComonnStylePage.module.css'

export const CreateNewPassword = () => {
  const [typeInputPassword, setTypeP] = useState<string>('password')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validate: values => {
      if (values.newPassword.length < 8) {
        return {
          newPassword: 'Password must be more than 7 characters',
        }
      }
    },

    onSubmit: values => {
      alert('Click')
    },
  })

  const onClickHandler = () => navigate(PATH.LOGIN)

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
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              label={'New password'}
              variant="standard"
              type={'password'}
              defaultValue={formik.errors.newPassword}
              helperText={formik.errors.newPassword}
              {...formik.getFieldProps('New password')}
            />
            <ShowPassword value={typeInputPassword} callback={setTypeP} />
          </div>
          <div className={s.text}>
            Create new password and we will send you further instructions to email
          </div>
          <button className={s.button} type={'submit'}>
            Create new password
          </button>
        </form>
      </Box>
    </div>
  )
}
