import { FC, ReactNode, useState } from 'react'

import { Box, Button, Modal } from '@mui/material'

export type ModalType = {
  children: ReactNode
}
export const CustomModal: FC<ModalType> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open} onClose={handleClose}>
        <Box>{children}</Box>
      </Modal>
    </>
  )
}
