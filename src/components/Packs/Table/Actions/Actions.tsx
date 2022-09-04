import React from 'react'

import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../routing/Pages/Pages'
import { setCardsPackIdAC } from '../../../../store/reducers/CardsParamsReducer'
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
  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log('card')
  }
  const onClickHandler = () => {
    dispatch(setCardsPackIdAC(packId))
    navigate(PATH.CARDS)
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
        <div onClick={onClickHandler}>
          <FaChalkboardTeacher />
        </div>
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
