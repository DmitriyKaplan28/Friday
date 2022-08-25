import React from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import logo from '../assets/logo.svg'

import s from './Header.module.css'

function Header() {
  return (
    <div className={s.header}>
      <div className={s.incubator}></div>
      <div className={s.button}>
        <NavLink to={'/login'} className={s.links}>
          Sing in
        </NavLink>
      </div>
    </div>
  )
}
export default Header

/*function Header() {
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

export default Header*/
