import React from 'react'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import { SignUp } from './pages/SignUp'
import { Route, Routes, Navigate } from 'react-router-dom'
import ResetPassword from './pages/ResetPassword'
import EnterNewPassword from './pages/EnterNewPassword'
import TestPage from './pages/TestPage'
import s from './Pages.module.css'
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
    <div className={s.wrapper}>
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
