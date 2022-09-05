import React, { ChangeEvent, useEffect, useState } from 'react'

import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { setModalStatusAC } from '../../store/reducers/AppReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { CustomModal } from '../CustomModal/CustomModal'

import s from './Packs.module.css'

export type AddPackModalType = {
  open: boolean
  setOpen: (value: boolean) => void
  handleAddPack: (value: string, checked: boolean) => void
}
export const AddPackModal = (props: AddPackModalType) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const dispatch = useAppDispatch()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleAddPack = () => {
    props.handleAddPack(value, checked)
  }
  const closeModal = () => {
    dispatch(setModalStatusAC('idle'))
    props.setOpen(!open)
  }

  useEffect(() => {
    setValue('')
  }, [modalStatusRequest === 'succeeded'])

  return (
    <CustomModal title={'Add Pack'} setOpen={closeModal} open={props.open}>
      <TextField
        onChange={onChangeTitle}
        value={value}
        sx={{ width: 350, marginBottom: 3 }}
        label="Name pack"
        variant="standard"
      />
      <FormControlLabel
        sx={{ marginBottom: 3 }}
        label="Private pack"
        control={<Checkbox checked={checked} onChange={handleChange} />}
      />
      <div className={s.RequestBlock}>
        {modalStatusRequest === 'succeeded' && (
          <span className={s.successText}>Pack added is success </span>
        )}
        {modalStatusRequest === 'failed' && (
          <span className={s.errorText}>Pack added is failed</span>
        )}
      </div>
      <div className={s.btnGroup}>
        <Button variant="outlined" size="large" onClick={closeModal}>
          Cancel
        </Button>
        <LoadingButton
          loading={modalStatusRequest === 'loading'}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
          onClick={handleAddPack}
        >
          Save
        </LoadingButton>
      </div>
    </CustomModal>
  )
}
