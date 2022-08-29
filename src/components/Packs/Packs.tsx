import React, { useEffect } from 'react'

import { setCardPacksTC } from '../../../reducers/packs-reducer'
import { useAppDispatch } from '../../../store/store'

import { StickyHeadTable } from './Table/Table'

export const Packs = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setCardPacksTC())
  }, [])

  return (
    <div>
      <StickyHeadTable />
    </div>
  )
}
