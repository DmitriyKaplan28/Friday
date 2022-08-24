import React from 'react'
import s from './Card.module.css'
import { Avatar } from '../avatar/Avatar'

import { UserType } from '../../api/api'

import { Button } from '@mui/material'

import { useAppDispatch } from '../../reducers/signup-reducer'
import { AiOutlineLogout } from 'react-icons/all'
import { logoutTC } from '../../reducers/auth-reducer'
import { EditableSpan } from '../editableSpan/EditableSpan'

type CardPropsTYpe = {
  title?: string
  user: UserType
  changeUserNameValue: (name: string, avatar?: string) => void
}
export const Card = (props: CardPropsTYpe) => {
  const dispatch = useAppDispatch()
  console.log('Card render')
  const onClickHandler = () => {
    dispatch(logoutTC())
  }
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{props.title ? props.title : 'Personal Information'}</h2>
      <Avatar />
      <EditableSpan callBack={props.changeUserNameValue} title={props.user.name} />
      <span className={s.email}>{props.user.email}</span>
      <Button className={s.btn} onClick={onClickHandler}>
        <AiOutlineLogout />
        <span>Log out</span>
      </Button>
    </div>
  )
}
