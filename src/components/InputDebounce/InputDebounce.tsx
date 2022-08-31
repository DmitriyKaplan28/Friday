import React, { useEffect, useState } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../common/hooks/useDebounce'
import { searchPackNameAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import s from './InputDebounce.module.css'

export const InputDebounce = () => {
  const dispatch = useAppDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(searchPackNameAC(debouncedSearchTerm))
  }, [debouncedSearchTerm])

  return (
    <div className={s.wrapper}>
      <div className={s.icon}>
        <AiOutlineSearch />
      </div>
      <input
        value={searchTerm}
        className={s.inputDebounce}
        placeholder="Search packs"
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  )
}
