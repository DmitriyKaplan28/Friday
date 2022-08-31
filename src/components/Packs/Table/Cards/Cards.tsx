import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSearchParams } from 'react-router-dom'

import SuperSelect from '../../../../common/features/c5-SuperSelect/SuperSelect'
import { getCardsParams } from '../../../../common/utils/GetParams'
import { getCardsTC, setPageCountCardsAC } from '../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { PaginationControlled } from '../../../Pagination/Pagination'
import { initialOptions } from '../../Packs'
import s from '../../Packs.module.css'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const [searchParams] = useSearchParams()
  const { page, pageCount, cardsTotalCount } = useAppSelector(state => state.cards)
  const params = getCardsParams(searchParams) //может обернуть в useMemo
  const pagesCount = Math.ceil(cardsTotalCount / params.pageCount)

  const onChangePageCount = (value: number) => {
    dispatch(setPageCountCardsAC(value))
  }

  useEffect(() => {
    debugger
    dispatch(getCardsTC(params))
  }, [page, pageCount, cardsTotalCount])

  return (
    <div className={s.wrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 900, margin: '100px' }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map(c => (
              <TableRow key={c._id}>
                <TableCell component="th" scope="row">
                  {c.question}
                </TableCell>
                <TableCell align="right">{c.answer}</TableCell>
                <TableCell align="right">{new Date(c.updated).toLocaleDateString()}</TableCell>
                <TableCell align="right">{c.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={s.pagination}>
        <PaginationControlled page={page} count={pagesCount} />
        <span className={s.title}>Show</span>
        <SuperSelect
          value={pageCount}
          options={initialOptions}
          onChangeOption={onChangePageCount}
        />
        <span className={s.title}>Cards per Page</span>
      </div>
    </div>
  )
}
