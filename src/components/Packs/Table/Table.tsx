import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../routing/PageRouting/Pages/Pages'
import { useAppSelector } from '../../../store/store'

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

interface Data {
  name: string
  cards: string
  updated: number
  created: number
  actions: number
}

function createData(
  name: string,
  cards: string,
  updated: number,
  created: number,
  actions: number
): Data {
  return { name, cards, updated, created, actions }
}

export const StickyHeadTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = () => {
    console.log('next')
  }

  const handleChangeRowsPerPage = () => {
    console.log('prev')
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
                  <TableCell align="left">
                    <NavLink to={`${PATH.CARDS}?cardsPack_id=${p._id}`}>{p.name}</NavLink>
                  </TableCell>
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
    </Paper>
  )
}
