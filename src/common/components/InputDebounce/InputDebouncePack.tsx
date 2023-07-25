import React, { useEffect } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../hooks/useDebounce'

import s from './InputDebounce.module.css'

type InputDebounceType = {
  callback: (value: string) => void
  width: number
  searchTerm: string
  setSearchTerm: (value: string) => void
}

export const InputDebouncePack = ({
  callback,
  width,
  setSearchTerm,
  searchTerm,
}: InputDebounceType) => {
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
