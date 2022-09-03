import React, { ChangeEvent, useState } from 'react'

import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { CustomModal } from '../CustomModal/CustomModal'

import s from './Packs.module.css'

export type EditPackModalType = {
  handleEditClick: (name: string) => void
  open: boolean
  setOpen: (value: boolean) => void
}
export const EditPackModal = (props: EditPackModalType) => {
  const [checked, setChecked] = useState(false)
  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value)
  }
  const handleEditClick = () => {
    props.handleEditClick(value)
    props.setOpen(!open)
  }

  return (
    <CustomModal open={props.open} setOpen={props.setOpen} title={'Edit pack'}>
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

      <div className={s.btnGroup}>
        <Button variant="outlined" size="large">
          Cancel
        </Button>
        <Button variant="contained" size="large" onClick={handleEditClick}>
          Save
        </Button>
      </div>
    </CustomModal>
  )
}
