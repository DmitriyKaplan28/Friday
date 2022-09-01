import React from 'react'

import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

type ActionsPropsType = {
  userId: string
  packId: string
}

export const Actions = ({ userId, packId }: ActionsPropsType) => {
  const user = useAppSelector(state => state.profile.user)
  const dispatch = useAppDispatch()

  const handleCardClick = () => {}
  const handleEditClick = () => {
    console.log('edit')
    dispatch(updatePackTC(packId))
  }
  const handleDeleteClick = () => {
    console.log('delete')
    dispatch(deletePackTC(packId))
  }

  if (userId === user._id) {
    return (
      <>
        <FaChalkboardTeacher onClick={handleCardClick} />
        <AiFillEdit onClick={handleEditClick} />
        <AiOutlineDelete onClick={handleDeleteClick} />
      </>
    )
  } else {
    return <FaChalkboardTeacher />
  }
}
