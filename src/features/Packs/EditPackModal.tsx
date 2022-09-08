import React from 'react'

import { CustomModal } from '../../components/CustomModal/CustomModal'
import { useAppSelector } from '../../store/store'

import { ModeModalType } from './Packs'
import s from './Packs.module.css'

export type EditPackModalType = {
  handleEditClick: (name: string) => void
  open: boolean
  setOpen: (value: boolean) => void
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const EditPackModal = (props: EditPackModalType) => {
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)

  const handleEditClick = (value: string) => {
    props.handleEditClick(value)
    props.setModeModal && props.setModeModal('add')
  }

  return (
    <CustomModal
      setModeModal={props.setModeModal}
      callback={handleEditClick}
      open={props.open}
      setOpen={props.setOpen}
      title={'Edit pack'}
      modeModal={props.modeModal}
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
