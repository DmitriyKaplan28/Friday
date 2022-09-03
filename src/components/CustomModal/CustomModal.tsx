import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Button, IconButton, Modal } from '@mui/material'

import { setShowModalAC } from '../../store/reducers/ModalReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import s from './CustomModal.module.css'

export type ModalType = {
  children: ReactNode
  title: string
}
export const CustomModal: FC<ModalType> = ({ children, title }) => {
  const dispatch = useAppDispatch()
  const open = useAppSelector(state => state.modal.open)
  const handleOpen = () => dispatch(setShowModalAC(true))
  const handleClose = () => dispatch(setShowModalAC(false))

  return (
    <>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal open={open} onClose={handleClose}>
        <div className={s.wrapper}>
          <div className={s.content}>
            <div className={s.titleBlock}>
              <span>{title}</span>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            {children}
          </div>
        </div>
      </Modal>
    </>
  )
}
