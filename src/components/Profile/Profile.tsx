import React from 'react'

import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { Navigate, NavLink } from 'react-router-dom'

import { PATH } from '../../routing/PageRouting/Pages/Pages'
import { changeNameTC } from '../../store/reducers/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { Card } from '../Card/Card'

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
      <div className={s.blockTitle}>
        <AiOutlineArrowLeft />
        <span className={s.title}>
          <NavLink to={PATH.PACKS}>Back to Packs List</NavLink>
        </span>
      </div>
      <Card user={user} changeUserNameValue={changeUserNameValue} />
    </div>
  )
}

export default Profile
