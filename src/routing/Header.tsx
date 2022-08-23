import React from 'react'
import { NavLink } from 'react-router-dom'
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
    </div>
  )
}
export default Header
