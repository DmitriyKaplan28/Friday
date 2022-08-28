import React, { useState } from 'react'

import { Box, TextField } from '@mui/material'
import { useFormik } from 'formik'

import { ShowPassword } from '../../common/c10-ShowPassword/ShowPassword'

import s from './ComonnStylePage.module.css'

export const CreateNewPassword = () => {
  const [typeInputPassword, setTypeP] = useState<string>('password')
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      if (values.password.length < 8) {
        return {
          password: 'Password must be more than 7 characters',
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
          <h1>Create new password?</h1>
          <div className={s.input}>
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              label={'Password'}
              variant="standard"
              type={'password'}
              defaultValue={formik.errors.password}
              helperText={formik.errors.password}
              {...formik.getFieldProps('password')}
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
