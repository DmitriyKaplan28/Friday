import * as React from 'react'

import { CustomCardsModal, ModeModalType } from '../CustomCardsModal'
import s from '../CustomModal.module.css'

export type RemoveCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleDeleteCard: () => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const RemoveCardsModal = (props: RemoveCardsModalType) => {
  const handleCard = (question: string, answer: string) => {
    props.handleDeleteCard()
    props.setModeModal && props.setModeModal('delete')
  }

  return (
    <div>
      <CustomCardsModal
        callback={handleCard}
        title={'Delete card'}
        setOpen={props.setOpen}
        open={props.open}
        modeModal={props.modeModal}
        setModeModal={props.setModeModal}
      >
        <div className={s.text}>
          Do you really want to remove Card Name? All cards will be deleted.
        </div>
      </CustomCardsModal>
    </div>
  )
}
