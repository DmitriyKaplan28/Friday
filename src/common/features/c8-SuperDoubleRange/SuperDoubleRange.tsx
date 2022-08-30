import * as React from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

import { setMaxCountCardAC, setMinCountCardAC } from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch } from '../../../store/store'

const minDistance = 1

export default function SuperDoubleRange() {
  const dispatch = useAppDispatch()

  const [value, setValue] = React.useState<number[]>([0, 60])
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

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={100}
      />
    </Box>
  )
}
