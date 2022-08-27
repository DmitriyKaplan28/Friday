import React from 'react'

import avatar from '../../assets/profile/avatar.png'
import icon from '../../assets/profile/iconPhoto.svg'

import s from './Avatar.module.css'

type AvatarPropsType = {
  width?: string
  mode?: string
}
export const Avatar = (props: AvatarPropsType) => {
  return (
    <>
      <div className={s.block}>
        <img style={{ width: props.width }} src={avatar} alt="avatar" />
        {props.mode === 'profile' && (
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
