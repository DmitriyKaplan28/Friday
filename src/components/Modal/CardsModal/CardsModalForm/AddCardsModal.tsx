import * as React from 'react'

import { useAppSelector } from '../../../../store/store'
import { ModeModalType } from '../../../Packs/Table/Pack/Cards/Cards'
import { CustomCardsModal } from '../CustomCardsModal'

export type AddCardsModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (question: string, answer: string) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const AddCardsModal = (props: AddCardsModalType) => {
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const handleAddPack = (question: string, answer: string) => {
    props.handleAddPack(question, answer)
    props.setModeModal && props.setModeModal('add')
  }

  return (
    <div>
      <CustomCardsModal
        callback={handleAddPack}
        title={'Add new card'}
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
