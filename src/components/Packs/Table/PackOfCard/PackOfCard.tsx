import * as React from 'react'
import { useEffect, useMemo } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSearchParams } from 'react-router-dom'

import { CardsParamsType } from '../../../../api/cardsApi'
import { sortCards } from '../../../../common/enum/sortCards'
import { getCardsTC } from '../../../../store/reducers/SignUpReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'

function createData(
  id: number,
  cardQuestion: string,
  cardAnswer: string,
  date: Date,
  Grade: number
) {
  return { id, cardQuestion, cardAnswer, date, Grade }
}

export const AcccessibleTable = () => {
  const rows = [
    createData(1, 'cardQuestion', 'cardAnswer', new Date(), 24),
    createData(2, 'cardQuestion', 'cardAnswer', new Date(), 37),
    createData(3, 'cardQuestion', 'cardAnswer', new Date(), 24),
  ]
  const dispatch = useAppDispatch()
  const cardsPack = useAppSelector(state => state.packs.cardPacks)
  const [searchParams] = useSearchParams()
  const cardsPack_id = searchParams.get('cardsPack_id') as string

  const getCardsParams = (searchParams: URLSearchParams): CardsParamsType => {
    return {
      cardsPack_id: String(searchParams.get('cardsPack_id')),
      page: Number(searchParams.get('page')) || undefined,
      sortCards: (searchParams.get('sortCards') as sortCards) || undefined,
      pageCount: Number(searchParams.get('pageCount')),
      cardQuestion: searchParams.get('cardQuestion') || undefined,
    }
  }

  const params = useMemo(() => getCardsParams(searchParams), [searchParams])

  console.log(params)

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
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.cardQuestion}
              </TableCell>
              <TableCell align="right">{row.cardAnswer}</TableCell>
              <TableCell align="right">{row.date.toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.Grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<button onClick={click}>Send Res</button>*/}
    </TableContainer>
  )
}
