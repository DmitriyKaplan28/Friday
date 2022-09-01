import React, { useEffect } from 'react'

import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch'

import { useDebounce } from '../../common/hooks/useDebounce'
import { searchPackNameAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch } from '../../store/store'

import s from './InputDebounce.module.css'

type InputDebounceType = {
  value: string
  onChangeValue: (value: string) => void
}

export const InputDebounce = (props: InputDebounceType) => {
  const dispatch = useAppDispatch()
  const debouncedSearchTerm = useDebounce(props.value, 500)

  useEffect(() => {
    dispatch(searchPackNameAC(debouncedSearchTerm))
  }, [debouncedSearchTerm])

  return (
    <div className={s.wrapper}>
      <span className={s.about}>Search</span>
      <div className={s.icon}>
        <AiOutlineSearch />
      </div>
      <input
        value={props.value}
        className={s.inputDebounce}
        placeholder="Search packs"
        onChange={e => props.onChangeValue(e.target.value)}
      />
    </div>
  )
}
