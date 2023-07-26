import * as React from 'react'
import { useState } from 'react'

import { EditCardsModal } from '../../../common/components/Modal/CardsModal/CardsModalForm/EditCardsModal'
import { RemoveCardsModal } from '../../../common/components/Modal/CardsModal/CardsModalForm/RemoveCardsModal'
import { ModeModalType } from '../../../common/components/Modal/CardsModal/CustomCardsModal'
import { MyIdActions } from '../../../common/components/Table/Actions/MyIdActions/MyIdActions'
import { deleteCardTC, updateCardTC } from '../../../store/Cards/CardsReducer'
import { useAppDispatch } from '../../../store/store'

type ActionCardsType = {
  id: string
  cardsPack_id: string
}
export const ActionCards = ({ id, cardsPack_id }: ActionCardsType) => {
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteCardTC(id, cardsPack_id))
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
    dispatch(updateCardTC(id, cardsPack_id, question, answer))
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
