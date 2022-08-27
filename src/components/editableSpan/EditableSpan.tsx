import * as React from 'react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { Button, InputAdornment } from '@mui/material'
import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'

import { CssTextField } from './CssCustomField'
import s from './EditableSpan.module.css'

type EditableSpanType = {
  callBack: (name: string, avatar?: string) => void
  title: string
  disabled?: boolean
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
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
