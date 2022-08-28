import React from 'react'

import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { Navigate } from 'react-router-dom'

import { Card } from '../../../components/card/Card'
import { changeNameTC } from '../../../reducers/profile-reducer'
import { useAppDispatch, useAppSelector } from '../../../reducers/signup-reducer'
import { PATH } from '../../Pages'

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
    <>
      <div className={s.wrapper}>
        <AiOutlineArrowLeft />
        <span className={s.title}>Back to Packs List</span>
      </div>
      <Card user={user} changeUserNameValue={changeUserNameValue} />
    </>
  )
}

export default Profile
