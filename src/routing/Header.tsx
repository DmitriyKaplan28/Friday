import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../assets/logo.svg'
import { Button } from '@mui/material'
function Header() {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.incubator}>
            <NavLink to={'/'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <Button variant="contained">Sing in</Button>
        </div>
      </div>
    </header>
  )
}
export default Header
