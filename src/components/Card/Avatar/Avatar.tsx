import React from 'react'

import avatar from '../../../common/assets/profile/avatar.png'
import icon from '../../../common/assets/profile/iconPhoto.svg'

import s from './Avatar.module.css'

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
