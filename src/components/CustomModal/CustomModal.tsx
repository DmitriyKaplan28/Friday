import { FC, ReactNode, useState } from 'react'

import { Box, Button, Modal } from '@mui/material'

export type ModalType = {
  children: ReactNode
  title: string
}
export const CustomModal: FC<ModalType> = ({ children, title }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>{title}</Button>
      <Modal open={open} onClose={handleClose}>
        <Box>{children}</Box>
      </Modal>
    </>
  )
}
