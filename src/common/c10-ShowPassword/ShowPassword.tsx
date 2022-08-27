import React, { useCallback, useState } from 'react'

import eye from '../../assets/register/eye.png'
import eyeClose from '../../assets/register/eyeClose.png'

import s from './ShowPassword.module.css'

type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = React.memo((props: ShowPasswordType) => {
  console.log('render ShowPassword')
  const [link, setLink] = useState<boolean>(false)

  const onChangeHandler = useCallback(() => {
    props.value === 'password' ? props.callback('text') : props.callback('password')
    setLink(!link)
  }, [props.value])

  return (
    <div className={s.showPassword} onClick={onChangeHandler}>
      {link ? <img src={eye} alt="" /> : <img src={eyeClose} alt="" />}
    </div>
  )
})
