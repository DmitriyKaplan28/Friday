import React from 'react'

import { Button } from '@mui/material'
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout'

import { UserType } from '../../../api/api'
import { logoutTC } from '../../../features/Login/AuthReducer'
import { sendEmailAC } from '../../../features/ResetPassword/ResetPasswordReducer'
import { useAppDispatch } from '../../../store/store'
import { Avatar } from '../Avatar/Avatar'
import { EditableSpan } from '../editableSpan/EditableSpan'

import s from './Card.module.css'

type CardPropsTYpe = {
  title?: string
  user: UserType
  changeUserNameValue: (name: string, avatar?: string) => void
}
export const Card = (props: CardPropsTYpe) => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(logoutTC())
    dispatch(sendEmailAC(false))
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{props.title ? props.title : 'Personal Information'}</h2>
      <Avatar mode={'profile'} width="96px" />
      <EditableSpan callBack={props.changeUserNameValue} title={props.user.name} />
      <span className={s.email}>{props.user.email}</span>
      <Button className={s.btn} onClick={onClickHandler}>
        <AiOutlineLogout />
        <span>Log out</span>
      </Button>
    </div>
  )
}
