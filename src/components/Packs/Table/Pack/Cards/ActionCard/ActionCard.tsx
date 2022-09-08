import * as React from 'react'
import { useState } from 'react'

import { deleteCardTC, updateCardTC } from '../../../../../../store/reducers/CardsReducer'
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
  const [openEdit, setOpenEdit] = useState(false)
  const [openRemove, setOpenRemove] = useState(false)
  const dispatch = useAppDispatch()
  const handleDeleteClick = () => {
    dispatch(deleteCardTC(props.id))
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
    dispatch(updateCardTC(props.id, question, answer))
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
