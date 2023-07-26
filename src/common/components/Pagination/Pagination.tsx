import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import s from '../../../features/Cards/Cards.module.css'
import { useAppSelector } from '../../../store/store'
import Select from '../Select/Select'

type PaginationControlledType = {
  count: number
  totalCount: number
  page?: number
  changePageCount: (value: number) => void
  setPage: (value: number) => void
}
export function PaginationControlled({
  count,
  totalCount,
  page,
  changePageCount,
  setPage,
}: PaginationControlledType) {
  const initialOptions = [4, 8, 16, 32, 64]
  const status = useAppSelector(state => state.app.status)
  let pagesCount = Math.ceil(totalCount / count)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <>
      <Stack spacing={2}>
        <Pagination
          disabled={status === 'loading'}
          page={page}
          count={pagesCount}
          onChange={handleChange}
        />
      </Stack>
      <span className={s.title}>Show</span>
      <Select value={count} options={initialOptions} onChangeOption={changePageCount} />
      <span className={s.title}>Cards per Page</span>
    </>
  )
}
