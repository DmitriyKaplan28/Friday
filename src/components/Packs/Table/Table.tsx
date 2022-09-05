import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../routing/Pages/Pages'
import { setCardsPackIdAC, setPageCurrentCardsAC } from '../../../store/reducers/CardsParamsReducer'
import { setPacksParamsAC } from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { SortArrow } from '../SortArrow/SortArrow'

import { Actions } from './Actions/Actions'
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
  const navigate = useNavigate()
  const onClickSortHandler = (value: number) => {
    dispatch(setPacksParamsAC({ sortPacks: value + `updated` }))
  }
  const onClickHandler = (id: string) => {
    dispatch(setPageCurrentCardsAC(1))
    dispatch(setCardsPackIdAC(id))
    navigate(PATH.CARDS)
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
                        <SortArrow label={column.label} onClickSortHandler={onClickSortHandler} />
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
                    <TableCell align="center" style={{ maxWidth: 170, overflow: 'hidden' }}>
                      <div onClick={() => onClickHandler(p._id)}>{p.name}</div>
                    </TableCell>
                    <TableCell align="center">{p.cardsCount}</TableCell>
                    <TableCell align="center">{new Date(p.updated).toLocaleDateString()}</TableCell>
                    <TableCell align="center" style={{ maxWidth: 260, overflow: 'hidden' }}>
                      {p.user_name}
                    </TableCell>
                    <TableCell align="center">
                      <Actions userId={p.user_id} packId={p._id} />
                    </TableCell>
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
