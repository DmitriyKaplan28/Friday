import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { setMyPacksAC } from '../../../features/Packs/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

import s from './ToggleButton.module.css'

type ToggleButtonType = {
  setAlignment: (value: string) => void
  alignment: string
  on: boolean
  setOn: (value: boolean) => void
}

export const ToggleButtonElement = ({ setAlignment, alignment, on, setOn }: ToggleButtonType) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.profile.user)
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === 'my') {
      dispatch(setMyPacksAC(user._id))
    }
    if (newAlignment === 'all') {
      dispatch(setMyPacksAC(''))
    }

    setOn(!on)
    setAlignment(newAlignment)
  }

  return (
    <div className={s.wrapper}>
      <span className={s.about}>Show packs cards</span>
      <ToggleButtonGroup
        sx={{ width: 200, height: 30 }}
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton sx={{ width: 100 }} value="my" selected={on} disabled={on}>
          My
        </ToggleButton>
        <ToggleButton sx={{ width: 100 }} value="all" selected={!on} disabled={!on}>
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
