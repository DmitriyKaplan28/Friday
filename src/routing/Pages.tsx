import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import s from './Page.module.css'
import EnterNewPassword from './pages/EnterNewPassword'
import Error404 from './pages/Error404'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'
import { SignUp } from './pages/SingUp/SignUp'
import TestPage from './pages/TestPage'

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  ENTER_NEW_PASSWORD: '/enter-new-password',
  TEST: '/test',
  // add paths
}

function Pages() {
  return (
    <div className={s.pages}>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />

        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PATH.ENTER_NEW_PASSWORD} element={<EnterNewPassword />} />
        <Route path={PATH.TEST} element={<TestPage />} />
        <Route path={'/*'} element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default Pages
