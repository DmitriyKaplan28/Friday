import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import SuperSelect from '../../../common/features/c5-SuperSelect/SuperSelect'
import { setCurrentPageAC, setPageCountAC } from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'

type Column = {
  id: 'name' | 'cards' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: Array<Column> = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cards', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'created',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
]

const optionsArr = [4, 8, 16, 32, 64]

export const StickyHeadTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  let { page, pageCount } = useAppSelector(state => state.paramsPacks)

  const dispatch = useAppDispatch()
  const handleChangePage = () => {
    dispatch(setCurrentPageAC(++page))
  }

  const handleChangeRowsPerPage = () => {
    if (page > 1) {
      dispatch(setCurrentPageAC(--page))
    }
  }
  const onChangePageCount = (value: number) => {
    dispatch(setPageCountAC(value))
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '130px' }}>
      <TableContainer sx={{ maxHeight: 640 }}>
        <Table aria-label="customized table">
          <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {packs.map(p => {
              return (
                <TableRow key={p._id}>
                  <TableCell align="left">{p.name}</TableCell>
                  <TableCell align="left">{p.cardsCount}</TableCell>
                  <TableCell align="left">{p.updated}</TableCell>
                  <TableCell align="center">{p.user_name}</TableCell>
                  <TableCell align="right">{'Actions'}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={handleChangeRowsPerPage}>prev</button>
      <button onClick={handleChangePage}>next</button>
      <SuperSelect options={optionsArr} onChangeOption={onChangePageCount} />
    </Paper>
  )
}
