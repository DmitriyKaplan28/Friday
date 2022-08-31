import React, { useState } from 'react'

import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown'
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp'

import s from './SortArrow.module.css'
type SortArrowType = {
  label?: string
  mode: boolean
  onClickSortHandler: (value: 0 | 1) => void
}

export const SortArrow = (props: SortArrowType) => {
  const [mode, setMode] = useState(true)
  const onClickHandler = (value: 0 | 1) => {
    props.onClickSortHandler(value)
    setMode(!mode)
  }

  return (
    <div className={s.btnBlock}>
      {mode ? (
        <button className={s.btn} onClick={() => onClickHandler(1)}>
          {props.label}
          <AiOutlineArrowDown />
        </button>
      ) : (
        <button className={s.btn} onClick={() => onClickHandler(0)}>
          {props.label}
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  )
}
