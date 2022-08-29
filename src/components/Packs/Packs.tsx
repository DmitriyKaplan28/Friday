import React, { useEffect } from 'react'

import { setCardPacksTC } from '../../store/reducers/PacksReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { StickyHeadTable } from './Table/Table'

export const Packs = () => {
  const page = useAppSelector(state => state.packs.page)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [page])

  return (
    <div>
      <StickyHeadTable />
    </div>
  )
}
