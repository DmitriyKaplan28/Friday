import { useState } from 'react'

import eye from '../../assets/register/eye.png'
import eyeClose from '../../assets/register/eyeClose.png'

import s from './ShowPassword.module.css'

type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = (props: ShowPasswordType) => {
  const [link, setLink] = useState<boolean>(false)
  const onChangeHandler = () => {
    props.value === 'password' ? props.callback('text') : props.callback('password')
    setLink(!link)
  }

  return (
    <div className={s.showPassword} onClick={onChangeHandler}>
      {link ? <img src={eye} alt="" /> : <img src={eyeClose} alt="" />}
    </div>
  )
}
