import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { setPacksParamsAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../store/store'

type PaginationControlledType = {
  count: number
  page?: number
}
export function PaginationControlled(props: PaginationControlledType) {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //dispatch(setCurrentPageAC(value))
    dispatch(setPacksParamsAC({ page: value }))
  }

  return (
    <Stack spacing={2}>
      <Pagination
        disabled={status === 'loading'}
        page={props.page}
        count={props.count}
        onChange={handleChange}
      />
    </Stack>
  )
}
