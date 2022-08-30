import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { AiOutlineArrowDown } from '@react-icons/all-files/ai/AiOutlineArrowDown'

import SuperSelect from '../../../common/features/c5-SuperSelect/SuperSelect'
import SuperDoubleRange from '../../../common/features/c8-SuperDoubleRange/SuperDoubleRange'
import {
  setCurrentPageAC,
  setPageCountAC,
  setSortUpCardAC,
} from '../../../store/reducers/PacksParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { SortArrow } from '../SortArrow/SortArrow'

type Column = {
  id: 'name' | 'cards' | 'updated' | 'created' | 'actions'
  label: string
  minWidth?: number
  align?: 'right'
  sortBy?: boolean
}

const columns: Array<Column> = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'cards', label: 'Cards', minWidth: 100 },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
    sortBy: true,
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

const optionsArr = [4, 8, 16, 32, 64]

export const StickyHeadTable = () => {
  const packs = useAppSelector(state => state.packs.cardPacks)
  let { page } = useAppSelector(state => state.paramsPacks)

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
  const onClickSortHandler = (value: 0 | 1) => {
    dispatch(setSortUpCardAC(value))
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
                  <div>
                    {column.label}
                    {column.sortBy && (
                      <SortArrow mode={true} onClickSortHandler={onClickSortHandler} />
                    )}
                  </div>
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
                  <TableCell align="right">{new Date(p.updated).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{p.user_name}</TableCell>
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
      <SuperDoubleRange />
    </Paper>
  )
}
