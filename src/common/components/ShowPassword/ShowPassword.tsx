import React, { memo, useCallback, useState } from 'react'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import s from './ShowPassword.module.css'

type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = memo(({ value, callback }: ShowPasswordType) => {
  const [link, setLink] = useState<boolean>(false)

  const onChangeHandler = useCallback(() => {
    value === 'password' ? callback('text') : callback('password')
    setLink(!link)
  }, [value])

  return (
    <div className={s.showPassword} onClick={onChangeHandler}>
      {link ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
    </div>
  )
})
