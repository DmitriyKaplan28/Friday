import React from 'react'

import { LinearProgress } from '@mui/material'
import { Route, Routes, Navigate } from 'react-router-dom'

import Error404 from '../../../components/Error404/Error404'
import { Login } from '../../../components/Login/Login'
import { EnterNewPassword } from '../../../components/Login/ResetPassword/EnterNewPassword/EnterNewPassword'
import { ResetPassword } from '../../../components/Login/ResetPassword/ResetPassword'
import { Packs } from '../../../components/Packs/Packs'
import Profile from '../../../components/Profile/Profile'
import { SignUp } from '../../../components/SingUp/SignUp'
import { useAppSelector } from '../../../store/store'

import s from './Pages.module.css'

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password/:token',
  PACKS: '/packs',
}

export const Pages = () => {
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
          <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={PATH.SET_NEW_PASSWORD} element={<EnterNewPassword />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={'/*'} element={<Error404 />} />
        </Routes>
      </div>
    </>
  )
}
