import React, { useEffect } from 'react'

import SuperSelect from '../../common/features/c5-SuperSelect/SuperSelect'
import SuperDoubleRange from '../../common/features/c8-SuperDoubleRange/SuperDoubleRange'
import { setPacksParamsAC } from '../../store/reducers/PacksParamsReducer'
import { setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { InputDebounce } from '../InputDebounce/InputDebounce'
import { PaginationControlled } from '../Pagination/Pagination'

import s from './Packs.module.css'
import { StickyHeadTable } from './Table/Table'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const { page, pageCount, min, max, sortPacks, packName } = useAppSelector(
    state => state.paramsPacks
  )
  const { cardPacksTotalCount } = useAppSelector(state => state.packs)
  const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)
  const onChangePageCount = (value: number) => {
    //dispatch(setPageCountAC(value))
    dispatch(setPacksParamsAC({ pageCount: value }))
  }
  const optionsArr = [4, 8, 16, 32, 64]

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page, pageCount, min, max, sortPacks, packName])

  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <InputDebounce />
        <SuperDoubleRange />
      </div>
      <StickyHeadTable />
      <div className={s.pagination}>
        <PaginationControlled count={pagesCount} />
        <span className={s.title}>Show</span>
        <SuperSelect options={optionsArr} onChangeOption={onChangePageCount} />
        <span className={s.title}>Cards per Page</span>
      </div>
    </div>
  )
}
