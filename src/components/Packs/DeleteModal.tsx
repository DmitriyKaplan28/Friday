import React from 'react'

import Button from '@mui/material/Button'

import { useAppSelector } from '../../store/store'
import { CustomModal } from '../CustomModal/CustomModal'

import s from './Packs.module.css'

export type DeleteModalType = {
  handleDeleteClick: () => void
  open: boolean
  setOpen: (value: boolean) => void
  packId: string
}

export const DeleteModal = (props: DeleteModalType) => {
  const pack = useAppSelector(state => state.packs.cardPacks.find(p => p._id === props.packId))

  const handleEditClick = () => {
    props.handleDeleteClick()
    props.setOpen(!open)
  }

  return (
    <CustomModal height={240} open={props.open} setOpen={props.setOpen} title={'Delete pack'}>
      <div style={{ marginBottom: 24 }}>
        <span>
          Do you really want to remove <p>{pack && pack.name}</p>? All cards will be deleted.
        </span>
      </div>
      <div className={s.btnGroup}>
        <Button variant="outlined" size="large">
          Cancel
        </Button>
        <Button color="error" variant="contained" size="large" onClick={handleEditClick}>
          Delete
        </Button>
      </div>
    </CustomModal>
  )
}
