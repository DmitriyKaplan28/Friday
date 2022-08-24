import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../reducers/signup-reducer'
import { PATH } from '../Pages'
const { isLogin } = useAppSelector((state) => state.app)

function Login() {
  if (isLogin) {
    return <Navigate to={PATH.PROFILE} />
  }
  return <div>Login</div>
}

export default Login

// сделайте по аналогии пустые страницы джун и джун+
// туда будут добавляться следующие дз
