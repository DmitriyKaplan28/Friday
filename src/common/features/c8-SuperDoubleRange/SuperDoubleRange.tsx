import * as React from 'react'

import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

const minDistance = 1

export default function SuperDoubleRange() {
  const [value, setValue] = React.useState<number[]>([0, 9])

  console.log(value[0])
  console.log(value[1])
  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
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
        onChange={handleChange1}
        valueLabelDisplay="auto"
        disableSwap
        min={0}
        max={10}
      />
    </Box>
  )
}
