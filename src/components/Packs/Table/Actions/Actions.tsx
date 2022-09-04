import React from 'react'

import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../routing/Pages/Pages'
import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

import s from './Actions.module.css'
import { MyIdActions } from './MyIdActions/MyIdActions'

type ActionsPropsType = {
  userId: string
  packId: string
}

export const Actions = ({ userId, packId }: ActionsPropsType) => {
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  const handleCardClick = () => {
    console.log('card')
  }
  const handleEditPackClick = () => {
    dispatch(updatePackTC(packId))
  }
  const handleDeletePackClick = () => {
    dispatch(deletePackTC(packId))
  }

  return (
    <div className={s.blockIcon}>
      <button disabled={status === 'loading'} className={s.iconBtn}>
        <NavLink to={`${PATH.CARDS}?cardsPack_id=${packId}`}>
          <FaChalkboardTeacher />
        </NavLink>
      </button>
      {userId === user._id ? (
        <MyIdActions
          handleDeleteClick={handleDeletePackClick}
          handleEditClick={handleEditPackClick}
        />
      ) : (
        ''
      )}
    </div>
  )
}
