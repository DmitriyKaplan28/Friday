import * as React from 'react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Button, InputAdornment } from '@mui/material'
import s from './EditableSpan.module.css'
import { CssTextField } from './CssCustomField'
import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'

type EditableSpanType = {
  callBack: (name: string, avatar?: string) => void
  title: string
  disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  console.log('EditableSpan render', props.title)
  let [editMode, setEditMode] = useState(false)
  let [inputValue, setInputValue] = useState('')
  const onClickDoubleHandler = () => {
    !props.disabled && setEditMode(!editMode)
  }
  const onClickHandler = () => {
    props.callBack(inputValue)
    onClickDoubleHandler()
  }
  const changeUserNameValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
      // props.callBack(e.currentTarget.value)
    },
    [props]
  )
  useEffect(() => {
    setInputValue(props.title)
  }, [props.title])
  return (
    <>
      {!editMode ? (
        <div className={s.wrapper} onDoubleClick={onClickDoubleHandler}>
          <span className={s.userName}>{props.title}</span>
          <BiEditAlt />
        </div>
      ) : (
        <CssTextField
          onChange={changeUserNameValue}
          value={inputValue}
          autoFocus
          type="text"
          label="Nickname"
          variant="standard"
          focused
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={onClickHandler} size="small" className={s.inputBtn}>
                  Save
                </Button>
              </InputAdornment>
            ),
            className: s.multilineColor,
          }}
        />
      )}
    </>
  )
})
