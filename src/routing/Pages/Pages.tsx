import React from 'react'

import { LinearProgress } from '@mui/material'
import { Route, Routes, Navigate } from 'react-router-dom'

import Error404 from '../../common/components/Error404/Error404'
import { Learn } from '../../common/components/Learning/LearningPage'
import { Cards } from '../../features/Cards/Cards'
import { EnterNewPassword } from '../../features/EnterNewPassword/EnterNewPassword'
import { Login } from '../../features/Login/Login'
import { Packs } from '../../features/Packs/Packs'
import Profile from '../../features/Profile/Profile'
import { ResetPassword } from '../../features/ResetPassword/ResetPassword'
import { SignUp } from '../../features/SingUp/SignUp'
import { useAppSelector } from '../../store/store'

export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  SIGNUP: '/sign-up',
  RESET_PASSWORD: '/reset-password',
  SET_NEW_PASSWORD: '/set-new-password/:token',
  PACKS: '/packs',
  CARDS: '/cards',
  LEARN: '/learn/:packId/:packName',
}

export const Pages = () => {
  const status = useAppSelector(state => state.app.status)

  return (
    <>
      {status === 'loading' && (
        <LinearProgress sx={{ position: 'absolute', width: '100%', top: '70px' }} />
      )}
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PATH.SET_NEW_PASSWORD} element={<EnterNewPassword />} />
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.CARDS} element={<Cards />} />
        <Route path={'/*'} element={<Error404 />} />
        <Route path={PATH.LEARN} element={<Learn />} />
      </Routes>
    </>
  )
}
