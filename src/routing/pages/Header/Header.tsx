import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from '../../../assets/logo.svg'
import { Avatar } from '../../../components/avatar/Avatar'
import { useAppSelector } from '../../../store/store'

import s from './Header.module.css'

export const Header = () => {
  const user = useAppSelector(state => state.profile.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.incubator}>
            <NavLink to={'/'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          {isLoggedIn && (
            <div className={s.block}>
              <span>{user.name}</span>
              <Avatar width={'36px'} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
