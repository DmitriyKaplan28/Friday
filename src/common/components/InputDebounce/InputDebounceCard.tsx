import React, { useState } from 'react'

import { InputDebounce } from './InputDebounce'

type InputDebounceType = {
  callback: (value: string) => void
  width: number
}

export const InputDebounceCard = ({ callback, width }: InputDebounceType) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <InputDebounce
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      width={width}
      callback={callback}
      placeholder={'Search cards'}
    />
  )
}
