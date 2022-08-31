import React from 'react'

import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit'
import { AiOutlineDelete } from '@react-icons/all-files/ai/AiOutlineDelete'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'

import { useAppSelector } from '../../../../store/store'

type ActionsPropsType = {
  userId: string
}

export const Actions = ({ userId }: ActionsPropsType) => {
  const user = useAppSelector(state => state.profile.user)

  if (userId === user._id) {
    return (
      <>
        <FaChalkboardTeacher />
        <AiFillEdit />
        <AiOutlineDelete />
      </>
    )
  } else {
    return <FaChalkboardTeacher />
  }
}
