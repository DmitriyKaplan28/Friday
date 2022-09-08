import * as React from 'react'

import { useAppSelector } from '../../../../../store/store'
import { CustomCardsModal, ModeModalType } from '../CustomCardsModal'

export type EditCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleEditCard: (question: string, answer: string) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const EditCardsModal = (props: EditCardsModalType) => {
  const handleCard = (question: string, answer: string) => {
    props.handleEditCard(question, answer)
    props.setModeModal && props.setModeModal('edit')
  }

  return (
    <div>
      <CustomCardsModal
        callback={handleCard}
        title={'Edit card'}
        setOpen={props.setOpen}
        open={props.open}
        modeModal={props.modeModal}
        setModeModal={props.setModeModal}
      >
        <div></div>
      </CustomCardsModal>
    </div>
  )
}
