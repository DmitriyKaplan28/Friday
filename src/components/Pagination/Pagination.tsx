import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { setPageCurrentCardsAC } from '../../store/reducers/CardsReducer'
import { useAppDispatch } from '../../store/store'

type PaginationControlledType = {
  count: number
  page?: number
}
export function PaginationControlled(props: PaginationControlledType) {
  const dispatch = useAppDispatch()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageCurrentCardsAC(value))
  }

  return (
    <Stack spacing={2}>
      <Pagination page={props.page} count={props.count} onChange={handleChange} />
    </Stack>
  )
}
