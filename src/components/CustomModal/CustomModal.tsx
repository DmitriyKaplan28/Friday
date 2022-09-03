import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Modal } from '@mui/material'

import s from './CustomModal.module.css'

export type ModalType = {
  children: ReactNode
  title: string
  open: boolean
  setOpen: (value: boolean) => void
  height?: number
}
export const CustomModal: FC<ModalType> = ({ children, title, open, setOpen, height = 300 }) => {
  const handleClose = () => setOpen(!open)

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
            {children}
          </div>
        </div>
      </Modal>
    </>
  )
}
