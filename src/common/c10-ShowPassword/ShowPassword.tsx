import eye from '../../assets/register/eye.png'
type ShowPasswordType = {
  value: string
  callback: (value: string) => void
}
export const ShowPassword = (props: ShowPasswordType) => {
  const onChangeHandler = () => {
    props.value === 'password' ? props.callback('text') : props.callback('password')
  }
  return <img src={eye} alt="" onClick={onChangeHandler} />
}
