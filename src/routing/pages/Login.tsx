import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../reducers/signup-reducer'
import { PATH } from '../Pages'

const Login = () => {
  const { isLogin } = useAppSelector((state) => state.app)
  if (isLogin) {
    return <Navigate to={PATH.PROFILE} />
  }
  return <div>Login</div>
}

export default Login

// сделайте по аналогии пустые страницы джун и джун+
// туда будут добавляться следующие дз
