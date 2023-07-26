import React, { useState } from 'react'

import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { ShowPassword } from '../../common/components/ShowPassword/ShowPassword'
import s from '../../common/style/CommonStylePage.module.css'
import { PATH } from '../../routing/Pages/Pages'
import { setNewPasswordTC } from '../../store/EnterNewPassword/EnterNewPasswordReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

export const EnterNewPassword = () => {
  const [typeInputPassword, setType] = useState<string>('password')
  const dispatch = useAppDispatch()
  const isSentNewPassword = useAppSelector(state => state.newPassword.isSentNewPassword)
  const { token } = useParams()

  console.log(token)
  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validate: values => {
      if (values.newPassword.length < 8) {
        return {
          password: 'Password must be more than 7 characters',
        }
      }
    },

    onSubmit: values => {
      if (token) {
        // @ts-ignore
        dispatch(setNewPasswordTC({ password: values.newPassword, resetPasswordToken: token }))
      }
    },
  })

  if (isSentNewPassword) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={s.card}>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '347px' },
        }}
      >
        <form method="post" onSubmit={formik.handleSubmit}>
          <h1>Create new password</h1>
          <div className={s.input}>
            <TextField
              error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
              label={'New password'}
              variant="standard"
              type={typeInputPassword}
              defaultValue={formik.errors.newPassword}
              helperText={formik.errors.newPassword}
              {...formik.getFieldProps('newPassword')}
            />
            <ShowPassword value={typeInputPassword} callback={setType} />
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
