import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { packsAPI } from '../../../api/api'
import { setSortUpCardAC } from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { SortArrow } from '../SortArrow/SortArrow'

import s from './Table.module.css'

type Column = {
  id: 'name' | 'cards' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  isSort?: boolean
}

const columns: Array<Column> = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cards', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
    isSort: true,
  },
  {
    id: 'created',
    label: 'Created by',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
  },
]

export const StickyHeadTable = () => {
  const { cardPacks } = useAppSelector(state => state.packs)
  const dispatch = useAppDispatch()
  const onClickSortHandler = (value: 0 | 1) => {
    dispatch(setSortUpCardAC(value))
  }
  const onClickHandler = (id: string) => {
    packsAPI.getCards(id).then(res => console.log(res))
  }

  return (
    <div className={s.wrapper}>
      <Paper sx={{ width: '100%' }}>
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
                    <div className={s.labelBlock}>
                      {column.isSort ? (
                        <SortArrow
                          label={column.label}
                          mode={column.isSort}
                          onClickSortHandler={onClickSortHandler}
                        />
                      ) : (
                        <div>{column.label}</div>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cardPacks.map(p => {
                return (
                  <TableRow key={p._id}>
                    <TableCell align="center">
                      <NavLink to={`${PATH.CARDS}?cardsPack_id=${p._id}`}>{p.name}</NavLink>
                    </TableCell>
                    <TableCell align="center">{p.cardsCount}</TableCell>
                    <TableCell align="center">{new Date(p.updated).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{p.user_name}</TableCell>
                    <TableCell align="center">{'Actions'}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}
