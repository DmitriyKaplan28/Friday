import React from 'react'

import { Navigate } from 'react-router-dom'

import { PATH } from '../../routing/PageRouting/Pages/Pages'
import { changeNameTC } from '../../store/reducers/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../store/reducers/signup-reducer'
import { Card } from '../Card/Card'

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

  return <Card user={user} changeUserNameValue={changeUserNameValue} />
}

export default Profile
