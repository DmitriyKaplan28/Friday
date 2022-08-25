import eye from '../../assets/register/eye.png'

import s from './ShowPassword.module.css'

type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = (props: ShowPasswordType) => {
  const onChangeHandler = () => {
    props.value === 'password' ? props.callback('text') : props.callback('password')
  }

  return (
    <div className={s.showPassword}>
      <img src={eye} alt="" onClick={onChangeHandler} />
    </div>
  )
}
