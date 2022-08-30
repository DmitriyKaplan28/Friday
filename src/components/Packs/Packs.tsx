import React, { useEffect } from 'react'

import { setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { StickyHeadTable } from './Table/Table'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const { page, pageCount } = useAppSelector(state => state.paramsPacks)

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page, pageCount])

  return (
    <div>
      <StickyHeadTable />
    </div>
  )
}
