import React, { useState } from 'react'

import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown'
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp'

import { useAppSelector } from '../../../store/store'

import s from './SortArrow.module.css'

type SortArrowType = {
  label?: string
  mode: boolean
  onClickSortHandler: (value: number) => void
}

export const SortArrow = (props: SortArrowType) => {
  const [mode, setMode] = useState(true)
  const status = useAppSelector(state => state.app.status)
  const sortPacks = useAppSelector(state => state.paramsPacks.sortPacks)
  let sortPacksNumber = parseInt(sortPacks)
  const onClickHandler = () => {
    sortPacksNumber = sortPacksNumber + 1
    if (sortPacksNumber > 1) {
      sortPacksNumber = 0
    }
    props.onClickSortHandler(sortPacksNumber)
    setMode(!mode)
  }

  return (
    <div className={s.btnBlock}>
      <button disabled={status === 'loading'} className={s.btn} onClick={onClickHandler}>
        {props.label}
        {mode ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
      </button>
    </div>
  )
}
