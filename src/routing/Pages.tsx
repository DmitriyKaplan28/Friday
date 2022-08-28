import React from 'react'

import { LinearProgress } from '@mui/material'
import { Route, Routes, Navigate } from 'react-router-dom'

import { useAppSelector } from '../store/store'

import s from './Page.module.css'
import { CreateNewPassword } from './pages/CreateNewPassword'
import Error404 from './pages/Error404'
import { ForgotPassword } from './pages/ForgotPassword'
import { Login } from './pages/Login'
import Profile from './pages/Profile/Profile'
import { SignUp } from './pages/SingUp/SignUp'
import TestPage from './pages/TestPage'

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  CREATE_NEW_PASSWORD: '/create-new-password',
  TEST: '/test',
  // add paths
}

function Pages() {
  const status = useAppSelector(state => state.app.status)

  return (
    <>
      {status === 'loading' && (
        <LinearProgress sx={{ position: 'absolute', width: '100%', top: '70px' }} />
      )}
      <div className={s.pages}>
        <Routes>
          <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
          <Route path={PATH.RESET_PASSWORD} element={<ForgotPassword />} />
          <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
          <Route path={PATH.TEST} element={<TestPage />} />
          <Route path={'/*'} element={<Error404 />} />
        </Routes>
      </div>
    </>
  )
}

export default Pages
