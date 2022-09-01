import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { setMyPacksAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

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
    <ToggleButtonGroup
      color="primary"
      value={props.alignment}
      exclusive
      disabled={status === 'loading'}
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="my">My</ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  )
}
