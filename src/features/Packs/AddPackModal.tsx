import React from 'react'

import { CustomModal } from '../../components/CustomModal/CustomModal'
import { useAppSelector } from '../../store/store'

import { ModeModalType } from './Packs'
import s from './Packs.module.css'

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
