import React from 'react'

import { createSelector } from 'reselect'

import { ModeModalType } from '../../../../features/Packs/Packs'
import { AppRootStateType, useAppSelector } from '../../../../store/store'

import { CustomModal } from './CustomModal/CustomModal'

export type DeleteModalType = {
  handleDeleteClick: () => void
  open: boolean
  setOpen: (value: boolean) => void
  packId: string
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}

export const DeletePackModal = ({
  open,
  setOpen,
  packId,
  modeModal,
  setModeModal,
  ...props
}: DeleteModalType) => {
  const getCardPack = (state: AppRootStateType) => state.packs.cardPacks
  const getFindCardPack = createSelector(getCardPack, packs => packs.find(p => p._id === packId))

  const pack = useAppSelector(getFindCardPack)

  const handleDeleteClick = () => {
    props.handleDeleteClick()
  }

  return (
    <CustomModal
      setModeModal={setModeModal}
      modeModal={modeModal}
      callback={handleDeleteClick}
      height={240}
      open={open}
      setOpen={setOpen}
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
