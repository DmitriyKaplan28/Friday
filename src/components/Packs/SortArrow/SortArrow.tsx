import React, { useState } from 'react'

import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown'
import { AiOutlineArrowUp } from '@react-icons/all-files/ai/AiOutlineArrowUp'

type SortArrowType = {
  mode: boolean
  onClickSortHandler: (value: 0 | 1) => void
}

export const SortArrow = (props: SortArrowType) => {
  const [mode, setMode] = useState(true)
  const onClickHandler = (value: 0 | 1) => {
    props.onClickSortHandler(value)
    setMode(!mode)
  }

  return (
    <div>
      {mode ? (
        <button onClick={() => onClickHandler(1)}>
          <AiOutlineArrowDown />
        </button>
      ) : (
        <button onClick={() => onClickHandler(0)}>
          <AiOutlineArrowUp />
        </button>
      )}
    </div>
  )
}
