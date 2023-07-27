import React, { useEffect } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../hooks/useDebounce'

import s from './InputDebounce.module.css'

type UniversalInputDebounceType = {
  callback: (value: string) => void
  width: number
  searchTerm: string
  setSearchTerm: (value: string) => void
  placeholder: string
}

export const InputDebounce = ({
  callback,
  width,
  searchTerm,
  setSearchTerm,
  placeholder,
}: UniversalInputDebounceType) => {
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
        placeholder={placeholder}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
