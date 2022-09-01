import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { setMyPacksAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import s from './ToggleButton.module.css'
type ColorToggleButtonType = {
  setAlignment: (value: string) => void
  alignment: string
}

export const ColorToggleButton = (props: ColorToggleButtonType) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === 'my') {
      dispatch(setMyPacksAC(user._id))
    }
    if (newAlignment === 'all') {
      dispatch(setMyPacksAC(''))
    }
    props.setAlignment(newAlignment)
  }

  return (
    <div className={s.wrapper}>
      <span className={s.about}>Show packs cards</span>
      <ToggleButtonGroup
        sx={{ width: 200, height: 30 }}
        color="primary"
        value={props.alignment}
        exclusive
        disabled={status === 'loading'}
        onChange={handleChange}
      >
        <ToggleButton sx={{ width: 100 }} value="my">
          My
        </ToggleButton>
        <ToggleButton sx={{ width: 100 }} value="all">
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
