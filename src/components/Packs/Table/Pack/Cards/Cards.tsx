import * as React from 'react'
import { useEffect, useState } from 'react'

import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Navigate, useSearchParams } from 'react-router-dom'

import { BackPage } from '../../../../../common/features/c11-BackPage/BackPage'
import { PATH } from '../../../../../routing/Pages/Pages'
import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from '../../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { InputDebounce } from '../../../../InputDebounce/InputDebounce'
import { PaginationControlled } from '../../../../Pagination/Pagination'
import { MyIdActions } from '../../Actions/MyIdActions/MyIdActions'

import s from './Cards.module.css'

export const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const page = useAppSelector(state => state.paramsCard.page)
  const cardPackId = useAppSelector(state => state.paramsCard.cardsPack_id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const pageCount = useAppSelector(state => state.paramsCard.pageCount)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myId = useAppSelector(state => state.profile.user._id)
  const myCards = myId === packUserId

  const onChangePageCount = (value: number) => {
    //dispatch(setPageCountCardsAC(value))
  }
  const setPage = (value: number) => {
    //dispatch(setPageCurrentCardsAC(value))
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  const handleAddCard = () => {
    dispatch(addCardTC(cardPackId))
  }

  return (
    <div className={s.wrapper}>
      <BackPage title={'Packs List'} route={PATH.PACKS} />
      <h3 className={s.mainTitle}>{packName}</h3>
      {myCards && (
        <Button variant="outlined" onClick={handleAddCard}>
          Add Pack
        </Button>
      )}
      <div className={s.filter}>
        <InputDebounce width={1200} value={searchTerm} onChangeValue={setSearchTerm} />
      </div>
      <div className={s.wrappers}>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 640 }}>
            <Table aria-label="customized table">
              <TableHead sx={{ backgroundColor: '#EFEFEF' }}>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell align="right">Answer</TableCell>
                  <TableCell align="right">Last Updated</TableCell>
                  <TableCell align="right">Grade</TableCell>
                  {myCards && <TableCell align="right">Actions</TableCell>}
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
                    {myCards && (
                      <TableCell align="right">
                        <MyIdActions
                          handleDeleteClick={() => {
                            dispatch(deleteCardTC(c._id))
                          }}
                          handleEditClick={() => {
                            dispatch(updateCardTC(c._id))
                          }}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div className={s.pagination}>
        <PaginationControlled
          page={page}
          count={pageCount}
          totalCount={cardsTotalCount}
          changePageCount={onChangePageCount}
          setPage={setPage}
        />
      </div>
    </div>
  )
}
