import * as React from 'react'
import { useState } from 'react'

import {
  addCardTC,
  deleteCardTC,
  updateCardTC,
} from '../../../../../../store/reducers/CardsReducer'
import { useAppDispatch } from '../../../../../../store/store'
import { EditCardsModal } from '../../../../../Modal/CardsModal/CardsModalForm/EditCardsModal'
import { RemoveCardsModal } from '../../../../../Modal/CardsModal/CardsModalForm/RemoveCardsModal'
import { ModeModalType } from '../../../../../Modal/CardsModal/CustomCardsModal'
import { MyIdActions } from '../../../Actions/MyIdActions/MyIdActions'

type ActionCardsType = {
  id: string
}
export const ActionCards = (props: ActionCardsType) => {
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteCardTC(props.id))
  }

  const handleOpenEdit = () => {
    setOpen(!open)
    setModeModal('edit')
  }
  const handleOpenDelete = () => {
    setOpen(!open)
    setModeModal('delete')
  }
  const handleEditClick = (question: string, answer: string) => {
    dispatch(updateCardTC(props.id, question, answer))
  }

  return (
    <div>
      <MyIdActions handleDeleteClick={handleOpenDelete} handleEditClick={handleOpenEdit} />
      <EditCardsModal
        open={open}
        setOpen={setOpen}
        handleEditCard={handleEditClick}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
      <RemoveCardsModal
        open={open}
        setOpen={setOpen}
        handleDeleteCard={handleDeleteClick}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
    </div>
  )
}
