import React from 'react'

import avatar from '../../assets/profile/avatar.png'
import icon from '../../assets/profile/iconPhoto.svg'

import s from './Avatar.module.css'

type AvatarPropsType = {
  width?: string
  mode?: string
  name?: string
}
export const Avatar = ({ width, mode, name }: AvatarPropsType) => {
  return (
    <>
      <div className={s.block}>
        <span>{name}</span>
        <img style={{ width: width, marginLeft: 5 }} src={avatar} alt="avatar" />
        {mode === 'profile' && (
          <div className={s.circle}>
            <button className={s.btn}>
              <img className={s.icon} src={icon} alt="photo-icon" />
            </button>
          </div>
        )}
      </div>
    </>
  )
}
