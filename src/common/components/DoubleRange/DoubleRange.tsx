import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'

import { setPacksParamsAC } from '../../../features/Packs/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

import s from './DoubleRange.module.css'

const minDistance = 1

export const DoubleRange = () => {
  const dispatch = useAppDispatch()
  const { min, max } = useAppSelector(state => state.paramsPacks)
  const [value, setValue] = useState<number[]>([min, max])

  useEffect(() => {
    setValue([min, max])
  }, [min, max])
  const handleChangeCommitted = () => {
    //dispatch(setMinCountCardAC(value[0]))
    dispatch(setPacksParamsAC({ min: value[0] }))
    //dispatch(setMaxCountCardAC(value[1]))
    dispatch(setPacksParamsAC({ max: value[1] }))
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
      <span className={s.about}>Number of cards</span>
      <div className={s.inputGroup}>
        <input onChange={onChangeMinHandler} value={value[0]} className={s.input} />
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={110}
        />
        <input onChange={onChangeMaxHandler} value={value[1]} className={s.input} />
      </div>
    </div>
  )
}
