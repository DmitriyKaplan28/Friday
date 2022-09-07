import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { DeletePackModal } from '../../DeletePackModal'
import { EditPackModal } from '../../EditPackModal'

import s from './Actions.module.css'

type ActionsPropsType = {
  userId: string
  packId: string
}

export const Actions = ({ userId, packId }: ActionsPropsType) => {
  const [open, setOpen] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  const handleEditClick = (name: string) => {
    dispatch(updatePackTC(packId, name))
  }
  const handleDeleteClick = () => {
    // dispatch(setModalStatusAC('idle'))
    dispatch(deletePackTC(packId))
  }
  const handleOpenEditModal = () => {
    setOpen(!open)
  }
  const handleOpenDelModal = () => {
    setOpenDelModal(true)
  }

  return (
    <div className={s.blockIcon}>
      <IconButton disabled className={s.iconBtn}>
        <SchoolIcon />
      </IconButton>
      <IconButton
        disabled={status === 'loading'}
        className={s.iconBtn}
        onClick={handleOpenEditModal}
      >
        <ModeEditOutlineIcon />
      </IconButton>
      <EditPackModal open={open} setOpen={setOpen} handleEditClick={handleEditClick} />
      <DeletePackModal
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
}
