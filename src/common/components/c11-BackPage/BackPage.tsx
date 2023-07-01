import { memo } from 'react'

import { AiOutlineArrowLeft } from '@react-icons/all-files/ai/AiOutlineArrowLeft'
import { NavLink } from 'react-router-dom'

import s from './BackPage.module.css'

type ShowPasswordType = {
  title: string
  route: string
}
export const BackPage = memo((props: ShowPasswordType) => {
  return (
    <div className={s.blockTitle}>
      <AiOutlineArrowLeft />
      <span className={s.title}>
        <NavLink to={props.route}>To {props.title}</NavLink>
      </span>
    </div>
  )
})
