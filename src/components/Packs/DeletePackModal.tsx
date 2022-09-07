import React from 'react'

import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'
import { createSelector } from 'reselect'

import { AppRootStateType, useAppSelector } from '../../store/store'
import { CustomModal } from '../CustomModal/CustomModal'

import s from './Packs.module.css'

export type DeleteModalType = {
  handleDeleteClick: () => void
  open: boolean
  setOpen: (value: boolean) => void
  packId: string
}

export const DeletePackModal = (props: DeleteModalType) => {
  const getCardPack = (state: AppRootStateType) => state.packs.cardPacks
  const getFindCardPack = createSelector(getCardPack, packs =>
    packs.find(p => p._id === props.packId)
  )
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const pack = useAppSelector(getFindCardPack)

  const handleDelClick = () => {
    props.handleDeleteClick()
  }
  const closeModal = () => {
    props.setOpen(!open)
  }

  return (
    <CustomModal height={240} open={props.open} setOpen={closeModal} title={'Delete pack'}>
      <div style={{ marginBottom: 24 }}>
        <span>
          Do you really want to remove{' '}
          <span>
            <strong>{pack && pack.name}</strong>
          </span>
          ? All cards will be deleted.
        </span>
      </div>
      <div className={s.btnGroup}>
        <Button variant="outlined" size="large" onClick={closeModal}>
          Cancel
        </Button>
        <LoadingButton
          loading={modalStatusRequest === 'loading'}
          loadingPosition="start"
          startIcon={<HighlightOffIcon />}
          variant="outlined"
          onClick={handleDelClick}
        >
          Delete
        </LoadingButton>
      </div>
    </CustomModal>
  )
}
