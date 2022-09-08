import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { useNavigate } from 'react-router-dom'

import { deletePackTC, updatePackTC } from '../../../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { DeletePackModal } from '../../DeletePackModal'
import { EditPackModal } from '../../EditPackModal'
import { ModeModalType } from '../../Packs'

import s from './Actions.module.css'

type ActionsPropsType = {
  userId: string
    cards_packId: string
    packName: string
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}

export const Actions = ({ userId, cards_packId, packName , modeModal, setModeModal }: ActionsPropsType) => {
  const [open, setOpen] = useState(false)
  const [openDelModal, setOpenDelModal] = useState(false)
    const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

    const openLearnPage = (packId: string, packName: string) => {
        navigate(`/learn/${packId}/${packName}`)
    }

  const handleEditClick = (name: string) => {
    dispatch(updatePackTC(cards_packId, name))
  }
  const handleDeletePackClick = () => {
    dispatch(deletePackTC(cards_packId))
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
      <IconButton disabled={status === 'loading'} className={s.iconBtn} onClick={() => openLearnPage(cards_packId, packName)}>
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
        packId={cards_packId}
        open={openDelModal}
        setOpen={setOpenDelModal}
        handleDeleteClick={handleDeletePackClick}
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
