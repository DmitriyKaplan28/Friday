import React from 'react'
import s from './Card.module.css'
import { Avatar } from '../avatar/Avatar'
import { UserType } from '../../api/api'
import { Button } from '@mui/material'
import { AiOutlineLogout } from '@react-icons/all-files/ai/AiOutlineLogout'

import { UserType } from '../../api/api'
import { EditableSpan } from '../../common/features/editableSpan/EditableSpan'
import { logoutTC } from '../../store/reducers/auth-reducer'
import { useAppDispatch } from '../../store/reducers/signup-reducer'

import { Avatar } from './Avatar/Avatar'
import s from './Card.module.css'

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
