import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import logo from '../assets/logo.svg'
import { Button } from '@mui/material'
function Header() {
  return (
    // <div className={s.header}>
    //   <div className={s.incubator}>
    //
    //   </div>
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.incubator}>
            <NavLink to={'/'}>
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <Button variant="contained">Sing in</Button>
          {/*<div className={s.button}>*/}
          {/*  <NavLink to={'/login'} className={s.links}>*/}
          {/*    Sing in*/}
          {/*  </NavLink>*/}
          {/*</div>*/}
          {/*<NavLink to={'/profile'} className={s.links}>*/}
          {/*  profile*/}
          {/*</NavLink>*/}
          {/*<NavLink to={'/sign-up'} className={s.links}>*/}
          {/*  sign up*/}
          {/*</NavLink>*/}
          {/*<NavLink to={'/reset-password'} className={s.links}>*/}
          {/*  reset password*/}
          {/*</NavLink>*/}
          {/*<NavLink to={'/enter-new-password'} className={s.links}>*/}
          {/*  enter new password*/}
          {/*</NavLink>*/}
          {/*<NavLink to={'/test'} className={s.links}>*/}
          {/*  test*/}
          {/*</NavLink>*/}
          {/*</div>*/}
        </div>
      </div>
    </header>
  )
}
export default Header
