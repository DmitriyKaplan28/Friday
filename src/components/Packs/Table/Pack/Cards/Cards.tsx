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
import SuperSelect from '../../../../../common/features/c5-SuperSelect/SuperSelect'
import { getCardsParams } from '../../../../../common/utils/GetParams'
import { PATH } from '../../../../../routing/Pages/Pages'
import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  setPageCountCardsAC,
  updateCardTC,
} from '../../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { InputDebounce } from '../../../../InputDebounce/InputDebounce'
import { PaginationControlled } from '../../../../Pagination/Pagination'
import { initialOptions } from '../../../Packs'
import { MyIdActions } from '../../Actions/MyIdActions/MyIdActions'

import s from './Cards.module.css'

export const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const [searchParams] = useSearchParams()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const params = getCardsParams(searchParams) //может обернуть в useMemo
  const pagesCount = Math.ceil(cardsTotalCount / pageCount)
  const myId = useAppSelector(state => state.profile.user._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const myCards = myId === packUserId
  const onChangePageCount = (value: number) => {
    dispatch(setPageCountCardsAC(value))
  }

  useEffect(() => {
    dispatch(getCardsTC(params))
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }
  const handleAddCard = () => {
    dispatch(addCardTC(params.cardsPack_id, params))
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
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 900, margin: '100px' }} aria-label="customized table">
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
                        dispatch(deleteCardTC(c._id, params))
                      }}
                      handleEditClick={() => {
                        dispatch(updateCardTC(c._id, params))
                      }}
                    />
                  </TableCell>
                )}
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
