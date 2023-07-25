import * as React from 'react'

import { CustomCardsModal, ModeModalType } from '../CustomCardsModal'

export type AddCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (question: string, answer: string) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const AddCardsModal = ({
  open,
  setOpen,
  setModeModal,
  modeModal,
  ...props
}: AddCardsModalType) => {
  const handleAddPack = (question: string, answer: string) => {
    props.handleAddPack(question, answer)
    setModeModal && setModeModal('add')
  }

  return (
    <div>
      <CustomCardsModal
        callback={handleAddPack}
        title={'Add new card'}
        setOpen={setOpen}
        open={open}
        modeModal={modeModal}
        setModeModal={setModeModal}
      >
        <div></div>
      </CustomCardsModal>
    </div>
  )
}
