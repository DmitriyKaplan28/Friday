import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import { setPacksParamsAC } from '../../store/reducers/PacksParamsReducer'
import { useAppDispatch } from '../../store/store'

type PaginationControlledType = {
  count: number
}
export function PaginationControlled(props: PaginationControlledType) {
  const dispatch = useAppDispatch()
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //dispatch(setCurrentPageAC(value))
    dispatch(setPacksParamsAC({ page: value }))
  }

  return (
    <Stack spacing={2}>
      <Pagination count={props.count} onChange={handleChange} />
    </Stack>
  )
}
