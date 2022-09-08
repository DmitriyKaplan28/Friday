import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { Checkbox, FormControlLabel, IconButton, Modal, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { setModalStatusAC } from '../../../../app/AppReducer'
import { ModeModalType } from '../../../../features/Packs/Packs'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

import s from './CustomModal.module.css'

export type ModalType = {
  children: ReactNode
  callback: (value: string, checked?: boolean) => void
  title: string
  open: boolean
  setOpen: (value: boolean) => void
  height?: number
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const CustomModal: FC<ModalType> = ({
  children,
  callback,
  title,
  open,
  setOpen,
  height = 300,
  modeModal,
  setModeModal,
}) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleClose = () => {
    setOpen(!open)
    setModeModal('close')
  }
  const handlePack = () => {
    callback(value, checked)
  }

  useEffect(() => {
    setValue('')
  }, [modalStatusRequest === 'succeeded'])
  const closeModal = () => {
    dispatch(setModalStatusAC('idle'))
    setOpen(!open)
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={s.wrapper} style={{ minHeight: height }}>
          <div className={s.content}>
            <div className={s.titleBlock}>
              <span>{title}</span>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            {modeModal === 'add' && (
              <>
                <TextField
                  onChange={onChangeTitle}
                  value={value}
                  sx={{ width: 350, marginBottom: 3 }}
                  label="Name pack"
                  variant="standard"
                />
                <FormControlLabel
                  sx={{ marginBottom: 3 }}
                  label="Private pack"
                  control={<Checkbox checked={checked} onChange={handleChange} />}
                />
              </>
            )}
            {children}
            <div className={s.btnGroup}>
              <Button variant="outlined" size="large" onClick={closeModal}>
                Cancel
              </Button>
              {modeModal === 'add' ? (
                <LoadingButton
                  size={'large'}
                  loading={modalStatusRequest === 'loading'}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  onClick={handlePack}
                >
                  Save
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={modalStatusRequest === 'loading'}
                  loadingPosition="start"
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color={'error'}
                  size="large"
                  onClick={handlePack}
                >
                  Delete
                </LoadingButton>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
