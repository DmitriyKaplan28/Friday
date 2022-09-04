import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

import SuperSelect from '../../common/features/c5-SuperSelect/SuperSelect'
import { useAppSelector } from '../../store/store'
import s from '../Packs/Table/Pack/Cards/Cards.module.css'

type PaginationControlledType = {
  count: number
  totalCount: number
  page?: number
  changePageCount: (value: number) => void
  setPage: (value: number) => void
}
export function PaginationControlled(props: PaginationControlledType) {
  const initialOptions = [4, 8, 16, 32, 64]
  const status = useAppSelector(state => state.app.status)
  let pagesCount = Math.ceil(props.totalCount / props.count)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    props.setPage(value)
  }

  return (
    <>
      <Stack spacing={2}>
        <Pagination
          disabled={status === 'loading'}
          page={props.page}
          count={pagesCount}
          onChange={handleChange}
        />
      </Stack>
      <span className={s.title}>Show</span>
      <SuperSelect
        value={props.count}
        options={initialOptions}
        onChangeOption={props.changePageCount}
      />
      <span className={s.title}>Cards per Page</span>
    </>
  )
}
