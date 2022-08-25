import React from 'react'
import { useAppDispatch, useAppSelector } from '../../reducers/signup-reducer'
import { changeNameTC } from '../../reducers/profile-reducer'
import { Navigate } from 'react-router-dom'
import { Card } from '../../components/card/Card'

function Profile() {
  const user = useAppSelector((state) => state.profile.user)
  const isLogin = useAppSelector((state) => state.auth.isLogin)
  const dispatch = useAppDispatch()
  if (!isLogin) {
    return <Navigate to="/login" />
  }
  const changeUserNameValue = (name: string, avatar?: string) => {
    dispatch(changeNameTC(name))
  }
  return <Card user={user} changeUserNameValue={changeUserNameValue} />
}

export default Profile
