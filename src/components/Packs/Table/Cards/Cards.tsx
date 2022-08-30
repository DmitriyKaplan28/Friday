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

import { getCardsParams } from '../../../../common/utils/GetParams'
import { getCardsTC } from '../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const [searchParams] = useSearchParams()

  console.log(cards)
  const params = getCardsParams(searchParams) //может обернуть в useMemo

  useEffect(() => {
    dispatch(getCardsTC(params))
  }, [])

  return (
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
  )
}
