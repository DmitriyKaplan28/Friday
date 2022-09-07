import React from 'react'

import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { useNavigate } from 'react-router-dom'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

import s from './Actions.module.css'
import { MyIdActions } from './MyIdActions/MyIdActions'

type ActionsPropsType = {
  userId: string
  cards_packId: string
  packName: string
}

export const Actions = ({ userId, cards_packId, packName }: ActionsPropsType) => {
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const openLearnPage = (packId: string, packName: string) => {
    navigate(`/learn/${packId}/${packName}`)
  }

  const handleEditPackClick = () => {
    dispatch(updatePackTC(cards_packId))
  }
  const handleDeletePackClick = () => {
    dispatch(deletePackTC(cards_packId))
  }

  return (
    <div className={s.blockIcon}>
      <button disabled={status === 'loading'} className={s.iconBtn}>
        {/*<NavLink to={PATH.LEARNING}>*/}
        <FaChalkboardTeacher onClick={() => openLearnPage(cards_packId, packName)} />
        {/*</NavLink>*/}
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
