import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import Slider from '@mui/material/Slider'

import { setMaxCountCardAC, setMinCountCardAC } from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch } from '../../../store/store'

import s from './SuperDoubleRange.module.css'

const minDistance = 1

export default function SuperDoubleRange() {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number[]>([3, 60])

  const handleChangeCommitted = () => {
    dispatch(setMinCountCardAC(value[0]))
    dispatch(setMaxCountCardAC(value[1]))
  }
  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }
  const onChangeMinHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value < value[1]) {
      setValue([+e.currentTarget.value, value[1]])
    }
  }
  const onChangeMaxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value > value[0]) {
      setValue([value[0], +e.currentTarget.value])
    }
  }

  return (
    <div className={s.wrapper}>
      <input onChange={onChangeMinHandler} value={value[0]} className={s.input} />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        disableSwap
        min={3}
        max={100}
      />
      <input onChange={onChangeMaxHandler} value={value[1]} className={s.input} />
    </div>
  )
}
