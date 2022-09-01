import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { setMyPacksAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

export const ColorToggleButton = () => {
  const dispatch = useAppDispatch()
  const [alignment, setAlignment] = React.useState('all')
  const user = useAppSelector(state => state.profile.user)
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === 'my') {
      dispatch(setMyPacksAC(user._id))
    }
    if (newAlignment === 'all') {
      dispatch(setMyPacksAC(''))
    }
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="my">My</ToggleButton>
      <ToggleButton value="all">All</ToggleButton>
    </ToggleButtonGroup>
  )
}
