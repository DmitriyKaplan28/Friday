import React, { memo, useCallback, useState } from 'react'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import s from './ShowPassword.module.css'

type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = memo((props: ShowPasswordType) => {
  console.log('render ShowPassword')
  const [link, setLink] = useState<boolean>(false)

  const onChangeHandler = useCallback(() => {
    props.value === 'password' ? props.callback('text') : props.callback('password')
    setLink(!link)
  }, [props.value])

  return (
    <div className={s.showPassword} onClick={onChangeHandler}>
      {link ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
    </div>
  )
})
