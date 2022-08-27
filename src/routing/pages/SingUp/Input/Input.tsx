import React, { FC, useState } from 'react'

import { TextField } from '@mui/material'
import { useFormikContext } from 'formik'

import { ShowPassword } from '../../../../common/c10-ShowPassword/ShowPassword'
import { initialValuesType } from '../SignUp'
import s from '../singUp.module.css'

type Props = {
  field: string
  type: string
  callback: (value: string) => void
  showPassword?: boolean
}

export const Input: FC<Props> = ({ field, type, callback, showPassword }) => {
  const context = useFormikContext<initialValuesType>()

  console.log('render Input')

  return (
    <div className={s.input}>
      <TextField
        error={
          context.touched[field as keyof initialValuesType] &&
          Boolean(context.errors[field as keyof initialValuesType])
        }
        label={field}
        variant="standard"
        type={type}
        defaultValue={context.errors[field as keyof initialValuesType]}
        helperText={context.errors[field as keyof initialValuesType]}
        {...context.getFieldProps(field)}
      />
      {showPassword ? <ShowPassword value={type} callback={callback} /> : null}
    </div>
  )
}
