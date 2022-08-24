import React from 'react'
import s from './Avatar.module.css'
import avatar from '../../assets/profile/avatar.png'
import icon from '../../assets/profile/iconPhoto.svg'

export const Avatar = () => {
  return (
    <>
      <div className={s.block}>
        <img src={avatar} alt="avatar" />
        <div className={s.circle}>
          <button className={s.btn}>
            <img className={s.icon} src={icon} alt="photo-icon" />
          </button>
        </div>
      </div>
    </>
  )
}
