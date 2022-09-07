import * as React from 'react'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormControl, IconButton, InputLabel, Modal, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { setModalStatusAC } from '../../../store/reducers/AppReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

import s from './CustomModal.module.css'

export type ModalCardsType = {
  children: ReactNode
  callback: (question: string, answer: string) => void
  title: string
  open: boolean
  setOpen: (value: boolean) => void
  height?: number
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}

export type ModeModalType = 'close' | 'add' | 'edit' | 'delete'
export const CustomCardsModal: React.FC<ModalCardsType> = ({
  children,
  callback,
  title,
  open,
  setOpen,
  height = 300,
  modeModal,
  setModeModal,
}) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const dispatch = useAppDispatch()
  const modalStatusRequest = useAppSelector(state => state.app.modalStatusRequest)
  const [format, setFormat] = useState('Текстовый вопрос')

  const changeMenu = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string)
  }
  const changeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }
  const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.currentTarget.value)
  }
  const handleClose = () => {
    setOpen(!open)
    setModeModal('close')
  }
  const handleCard = () => {
    callback(question, answer)
    setQuestion('')
    setAnswer('')
    setOpen(!open)
  }

  useEffect(() => {}, [modalStatusRequest === 'succeeded'])
  const closeModal = () => {
    dispatch(setModalStatusAC('idle'))
    setOpen(!open)
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={s.wrapper} style={{ minHeight: height }}>
          <div className={s.content}>
            <div className={s.titleBlock}>
              <span>{title}</span>
              <IconButton color="primary" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>
            {modeModal === 'add' && (
              <>
                <FormControl fullWidth>
                  <InputLabel>Choose a question format</InputLabel>
                  <Select value={format} label="Choose a question format" onChange={changeMenu}>
                    <MenuItem value={'Текстовый вопрос'}>Текстовый вопрос</MenuItem>
                    <MenuItem value={'Изображение'}>Изображение</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  onChange={changeQuestion}
                  value={question}
                  sx={{ width: 350, marginBottom: 3 }}
                  label="Question"
                  variant="standard"
                />
                <TextField
                  onChange={changeAnswer}
                  value={answer}
                  sx={{ width: 350, marginBottom: 3 }}
                  label="Answer"
                  variant="standard"
                />
              </>
            )}
            {children}
            <div className={s.btnGroup}>
              <Button variant="outlined" size="large" onClick={closeModal}>
                Cancel
              </Button>
              {modeModal === 'add' ? (
                <LoadingButton
                  size={'large'}
                  loading={modalStatusRequest === 'loading'}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="outlined"
                  onClick={handleCard}
                >
                  Save
                </LoadingButton>
              ) : (
                <LoadingButton
                  loading={modalStatusRequest === 'loading'}
                  loadingPosition="start"
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  color={'error'}
                  size="large"
                  onClick={handleCard}
                >
                  Delete
                </LoadingButton>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
