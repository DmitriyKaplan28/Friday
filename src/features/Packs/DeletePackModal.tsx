import React from 'react'

import { createSelector } from 'reselect'

import { CustomModal } from '../../components/CustomModal/CustomModal'
import { AppRootStateType, useAppSelector } from '../../store/store'

import { ModeModalType } from './Packs'

export type DeleteModalType = {
  handleDeleteClick: () => void
  open: boolean
  setOpen: (value: boolean) => void
  packId: string
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}

export const DeletePackModal = (props: DeleteModalType) => {
  const getCardPack = (state: AppRootStateType) => state.packs.cardPacks
  const getFindCardPack = createSelector(getCardPack, packs =>
    packs.find(p => p._id === props.packId)
  )

  const pack = useAppSelector(getFindCardPack)

  const handleDelClick = () => {
    props.handleDeleteClick()
  }

  return (
    <CustomModal
      setModeModal={props.setModeModal}
      modeModal={props.modeModal}
      callback={handleDelClick}
      height={240}
      open={props.open}
      setOpen={props.setOpen}
      title={'Delete pack'}
    >
      <div style={{ marginBottom: 24 }}>
        <span>
          Do you really want to remove{' '}
          <span>
            <strong>{pack && pack.name}</strong>
          </span>
          ? All cards will be deleted.
        </span>
      </div>
    </CustomModal>
  )
}
