import React from 'react'

import { Navigate } from 'react-router-dom'

import { BackPage } from '../../common/components/BackPage/BackPage'
import { Card } from '../../common/components/Card/Card'
import { PATH } from '../../routing/Pages/Pages'
import { changeNameTC } from '../../store/Profile/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import s from './Profile.module.css'

function Profile() {
  const user = useAppSelector(state => state.profile.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  const changeUserNameValue = (name: string, avatar?: string) => {
    dispatch(changeNameTC(name))
  }

  return (
    <div className={s.wrapper}>
      <BackPage title={'Packs List'} route={PATH.PACKS} />
      <Card user={user} changeUserNameValue={changeUserNameValue} />
    </div>
  )
}

export default Profile
