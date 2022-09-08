import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../common/hooks/useDebounce'
import { useAppDispatch } from '../../store/store'

import s from './InputDebounce.module.css'

type InputDebounceType = {
  callback: (filter: string) => void
  width: number
}

export const InputDebounce = (props: InputDebounceType) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  //const dispatch = useAppDispatch()
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

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
        value={searchTerm}
        className={s.inputDebounce}
        placeholder="Search packs"
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
