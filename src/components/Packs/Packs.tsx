import React, { useEffect, useState } from 'react'

import { RiFilterOffFill } from '@react-icons/all-files/ri/RiFilterOffFill'

import SuperSelect from '../../common/features/c5-SuperSelect/SuperSelect'
import SuperDoubleRange from '../../common/features/c8-SuperDoubleRange/SuperDoubleRange'
import { setPageCountAC, setResetSettingsPacksAC } from '../../store/reducers/PacksParamsReducer'
import { setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { InputDebounce } from '../InputDebounce/InputDebounce'
import { PaginationControlled } from '../Pagination/Pagination'

import s from './Packs.module.css'
import { StickyHeadTable } from './Table/Table'

export const initialOptions = [4, 8, 16, 32, 64]

export const Packs = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const { page, pageCount, min, max, sortPacks, packName } = useAppSelector(
    state => state.paramsPacks
  )

  const { cardPacksTotalCount } = useAppSelector(state => state.packs)
  const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)

  const onChangePageCount = (value: number) => {
    dispatch(setPageCountAC(value))
  }
  const onClickReset = () => {
    dispatch(setResetSettingsPacksAC())
    setSearchTerm('')
  }

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page, pageCount, min, max, sortPacks, packName])

  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <InputDebounce value={searchTerm} onChangeValue={setSearchTerm} />
        <SuperDoubleRange />
        <div className={s.reset} onClick={onClickReset}>
          <button>
            <RiFilterOffFill />
          </button>
        </div>
      </div>
      <StickyHeadTable />
      <div className={s.pagination}>
        <PaginationControlled page={page} count={pagesCount} />
        <span className={s.title}>Show</span>
        <SuperSelect
          value={pageCount}
          options={initialOptions}
          onChangeOption={onChangePageCount}
        />
        <span className={s.title}>Cards per Page</span>
      </div>
    </div>
  )
}
