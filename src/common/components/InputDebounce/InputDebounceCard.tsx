import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../hooks/useDebounce'

import s from './InputDebounce.module.css'

type InputDebounceType = {
  callback: (value: string) => void
  width: number
}

export const InputDebounceCard = ({ callback, width }: InputDebounceType) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  //TODO убрать дублирование с InputDebouncePack
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    callback(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <div className={s.wrapper} style={{ maxWidth: width }}>
      <span className={s.about}>Search</span>
      <div className={s.icon}>
        <AiOutlineSearch />
      </div>
      <input
        style={{ maxWidth: width }}
        value={searchTerm}
        className={s.inputDebounce}
        placeholder="Search packs"
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
