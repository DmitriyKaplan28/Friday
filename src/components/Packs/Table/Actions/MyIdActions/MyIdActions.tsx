import React from 'react'

import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'

import { useAppSelector } from '../../../../../store/store'
import s from '../Actions.module.css'

type MyIdActionsType = {
  handleEditClick: () => void
  handleDeleteClick: () => void
}

export const MyIdActions = ({ handleEditClick, handleDeleteClick }: MyIdActionsType) => {
  const status = useAppSelector(state => state.app.status)

  return (
    <>
      <button disabled={status === 'loading'} onClick={handleEditClick} className={s.iconBtn}>
        <AiFillEdit />
      </button>
      <button disabled={status === 'loading'} onClick={handleDeleteClick} className={s.iconBtn}>
        <AiOutlineDelete />
      </button>
    </>
  )
}
