import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { DeletePackModal } from '../../DeletePackModal'
import { EditPackModal } from '../../EditPackModal'
import { ModeModalType } from '../../Packs'

import s from './Actions.module.css'

type ActionsPropsType = {
  userId: string
  packId: string
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}

export const Actions = ({ userId, packId, modeModal, setModeModal }: ActionsPropsType) => {
  const [open, setOpen] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()

  const handleEditClick = (name: string) => {
    dispatch(updatePackTC(packId, name))
  }
  const handleDeleteClick = () => {
    dispatch(deletePackTC(packId))
  }
  const handleOpenEditModal = () => {
    setModeModal && setModeModal('add')
    setOpen(!open)
  }
  const handleOpenDelModal = () => {
    setModeModal && setModeModal('delete')
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
      <EditPackModal
        modeModal={modeModal}
        setModeModal={setModeModal}
        open={open}
        setOpen={setOpen}
        handleEditClick={handleEditClick}
      />
      <DeletePackModal
        modeModal={modeModal}
        setModeModal={setModeModal}
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
