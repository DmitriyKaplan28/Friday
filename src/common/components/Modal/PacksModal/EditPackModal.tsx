import React from 'react'

import { ModeModalType } from '../../../../features/Packs/Packs'
import s from '../../../../features/Packs/Packs.module.css'
import { useAppSelector } from '../../../../store/store'

import { CustomModal } from './CustomModal/CustomModal'

export type EditPackModalType = {
  handleEditClick: (name: string) => void
  open: boolean
  setOpen: (value: boolean) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const EditPackModal = ({
  open,
  setOpen,
  modeModal,
  setModeModal,
  ...props
}: EditPackModalType) => {
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)

  const handleEditClick = (value: string) => {
    props.handleEditClick(value)
    setModeModal && setModeModal('add')
  }

  return (
    <CustomModal
      setModeModal={setModeModal}
      callback={handleEditClick}
      open={open}
      setOpen={setOpen}
      title={'Edit pack'}
      modeModal={modeModal}
    >
      <div className={s.RequestBlock}>
        {modalStatusRequest === 'succeeded' && (
          <span className={s.successText}>Pack edit is success </span>
        )}
        {modalStatusRequest === 'failed' && (
          <span className={s.errorText}>Pack edit is failed</span>
        )}
      </div>
    </CustomModal>
  )
}
