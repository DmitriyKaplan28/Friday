import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../routing/Pages/Pages'
import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { DeleteModal } from '../../DeleteModal'
import { EditPackModal } from '../../EditPackModal'

import s from './Actions.module.css'

type ActionsPropsType = {
  userId: string
  packId: string
}

export const Actions = ({ userId, packId }: ActionsPropsType) => {
  const [open, setOpen] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  const handleCardClick = () => {
    console.log('card')
  }
  const handleEditClick = (name: string) => {
    dispatch(updatePackTC(packId, name))
  }
  const handleDeleteClick = () => {
    dispatch(deletePackTC(packId))
  }
  const handleOpenEditModal = () => {
    setOpen(!open)
  }
  const handleOpenDelModal = () => {
    setOpenDelModal(true)
  }

  if (userId === user._id) {
    return (
      <div className={s.blockIcon}>
        <IconButton disabled={status === 'loading'} className={s.iconBtn} onClick={handleCardClick}>
          <NavLink to={`${PATH.CARDS}?cardsPack_id=${packId}`}>
            <SchoolIcon />
          </NavLink>
        </IconButton>
        <IconButton
          disabled={status === 'loading'}
          className={s.iconBtn}
          onClick={handleOpenEditModal}
        >
          <ModeEditOutlineIcon />
        </IconButton>
        <EditPackModal open={open} setOpen={setOpen} handleEditClick={handleEditClick} />
        <DeleteModal
          packId={packId}
          open={openDelModal}
          setOpen={setOpenDelModal}
          handleDeleteClick={handleDeleteClick}
        />
        <IconButton
          disabled={status === 'loading'}
          className={s.iconBtn}
          onClick={handleOpenDelModal}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  } else {
    return (
      <button disabled={status === 'loading'} className={s.iconBtn}>
        <NavLink to={`${PATH.CARDS}?cardsPack_id=${packId}`}>
          <FaChalkboardTeacher />
        </NavLink>
      </button>
    )
  }
}
