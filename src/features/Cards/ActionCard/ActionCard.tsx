import * as React from 'react'
import { useState } from 'react'

import { EditCardsModal } from '../../../common/components/Modal/CardsModal/CardsModalForm/EditCardsModal'
import { RemoveCardsModal } from '../../../common/components/Modal/CardsModal/CardsModalForm/RemoveCardsModal'
import { ModeModalType } from '../../../common/components/Modal/CardsModal/CustomCardsModal'
import { MyIdActions } from '../../../common/components/Table/Actions/MyIdActions/MyIdActions'
import { useAppDispatch } from '../../../store/store'
import { deleteCardTC, updateCardTC } from '../CardsReducer'

type ActionCardsType = {
  id: string
  cardsPack_id: string
}
export const ActionCards = (props: ActionCardsType) => {
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteCardTC(props.id, props.cardsPack_id))
  }

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit)
    setModeModal('edit')
  }
  const handleOpenDelete = () => {
    setOpenRemove(!openRemove)
    setModeModal('delete')
  }
  const handleEditClick = (question: string, answer: string) => {
    dispatch(updateCardTC(props.id, props.cardsPack_id, question, answer))
  }

  return (
    <div>
      <MyIdActions handleDeleteClick={handleOpenDelete} handleEditClick={handleOpenEdit} />
      <EditCardsModal
        open={openEdit}
        setOpen={setOpenEdit}
        handleEditCard={handleEditClick}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
      <RemoveCardsModal
        open={openRemove}
        setOpen={setOpenRemove}
        handleDeleteCard={handleDeleteClick}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
    </div>
  )
}
