import * as React from 'react'
import { useState } from 'react'

import {
  addCardTC,
  deleteCardTC,
  updateCardTC,
} from '../../../../../../store/reducers/CardsReducer'
import { useAppDispatch } from '../../../../../../store/store'
import { EditCardsModal } from '../../../../../Modal/CardsModal/CardsModalForm/EditCardsModal'
import { ModeModalType } from '../../../../../Modal/CardsModal/CustomCardsModal'
import { MyIdActions } from '../../../Actions/MyIdActions/MyIdActions'

type ActionCardsType = {
  id: string
}
export const ActionCards = (props: ActionCardsType) => {
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {}

  const handleOpen = () => {
    setOpen(!open)
    setModeModal('add')
  }
  const handleEditClick = (question: string, answer: string) => {
    dispatch(updateCardTC(props.id, question, answer))
  }

  return (
    <div>
      <MyIdActions handleDeleteClick={handleOpen} handleEditClick={handleOpen} />
      <EditCardsModal
        open={open}
        setOpen={setOpen}
        handleEditCard={handleEditClick}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
    </div>
  )
}
