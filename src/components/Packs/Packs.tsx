import React, { useEffect } from 'react'

import { setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { StickyHeadTable } from './Table/Table'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const { page, pageCount, min, max } = useAppSelector(state => state.paramsPacks)

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page, pageCount, min, max])

  return (
    <div>
      <StickyHeadTable />
    </div>
  )
}
