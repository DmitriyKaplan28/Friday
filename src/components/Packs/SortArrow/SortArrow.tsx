import React, { useState } from 'react'

import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown'
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp'

import { useAppSelector } from '../../../store/store'

import s from './SortArrow.module.css'

type SortArrowType = {
  label?: string
  mode: boolean
  onClickSortHandler: (value: 0 | 1) => void
}

export const SortArrow = (props: SortArrowType) => {
  const [mode, setMode] = useState(true)
  const status = useAppSelector(state => state.app.status)
  const sortPacks = useAppSelector(state => state.paramsPacks.sortPacks)
  let numEl = parseInt(sortPacks)

  console.log(sortPacks)
  console.log(typeof numEl, numEl)
  const onClickHandler = (value: 0 | 1) => {
    props.onClickSortHandler(value)
    setMode(!mode)
  }

  return (
    <div className={s.btnBlock}>
      {mode ? (
        <button disabled={status === 'loading'} className={s.btn} onClick={() => onClickHandler(1)}>
          {props.label}
          <AiOutlineArrowDown />
        </button>
      ) : (
        <button disabled={status === 'loading'} className={s.btn} onClick={() => onClickHandler(0)}>
          {props.label}
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  )
}
