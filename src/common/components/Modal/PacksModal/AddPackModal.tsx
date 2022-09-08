import React from 'react'

import { ModeModalType } from '../../../../features/Packs/Packs'
import s from '../../../../features/Packs/Packs.module.css'
import { useAppSelector } from '../../../../store/store'

import { CustomModal } from './CustomModal/CustomModal'

export type AddPackModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (value: string, checked: boolean) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const AddPackModal = (props: AddPackModalType) => {
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const handleAddPack = (value: string, checked = false) => {
    props.handleAddPack(value, checked)
    props.setModeModal && props.setModeModal('add')
  }

  return (
    <CustomModal
      callback={handleAddPack}
      title={'Add Pack'}
      setOpen={props.setOpen}
      open={props.open}
      modeModal={props.modeModal}
      setModeModal={props.setModeModal}
    >
      <div className={s.RequestBlock}>
        {modalStatusRequest === 'succeeded' && (
          <span className={s.successText}>Pack added is success </span>
        )}
        {modalStatusRequest === 'failed' && (
          <span className={s.errorText}>Pack added is failed</span>
        )}
      </div>
    </CustomModal>
  )
}
