import React from 'react'

import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

import s from './Actions.module.css'
type ActionsPropsType = {
  userId: string
  packId: string
}

export const Actions = ({ userId, packId }: ActionsPropsType) => {
  const user = useAppSelector(state => state.profile.user)
  const dispatch = useAppDispatch()

  const handleCardClick = () => {
    console.log('card')
  }
  const handleEditClick = () => {
    dispatch(updatePackTC(packId))
  }
  const handleDeleteClick = () => {
    dispatch(deletePackTC(packId))
  }

  if (userId === user._id) {
    return (
      <div className={s.blockIcon}>
        <div className={s.icon}>
          <FaChalkboardTeacher onClick={handleCardClick} />
        </div>
        <div className={s.icon}>
          <AiFillEdit onClick={handleEditClick} />
        </div>
        <div className={s.icon}>
          <AiOutlineDelete onClick={handleDeleteClick} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={s.icon}>
        <FaChalkboardTeacher />
      </div>
    )
  }
}
