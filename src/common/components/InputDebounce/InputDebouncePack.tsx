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

export const InputDebouncePack = (props: InputDebounceType) => {
  const debouncedSearchTerm = useDebounce(props.searchTerm, 500)

  useEffect(() => {
    props.callback(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <div className={s.wrapper} style={{ maxWidth: props.width }}>
      <span className={s.about}>Search</span>
      <div className={s.icon}>
        <AiOutlineSearch />
      </div>
      <input
        style={{ maxWidth: props.width }}
        value={props.searchTerm}
        className={s.inputDebounce}
        placeholder="Search packs"
        onChange={e => props.setSearchTerm(e.target.value)}
      />
    </div>
  )
}
