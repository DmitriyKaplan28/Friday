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
import { Navigate } from 'react-router-dom'

import { BackPage } from '../../../../../common/features/c11-BackPage/BackPage'
import { PATH } from '../../../../../routing/Pages/Pages'
import {
  setFilterQuestionCardAC,
  setPageCountCardsAC,
  setPageCurrentCardsAC,
  setSortCardAC,
} from '../../../../../store/reducers/CardsParamsReducer'
import {
  addCardTC,
  deleteCardTC,
  getCardsTC,
  updateCardTC,
} from '../../../../../store/reducers/CardsReducer'
import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { InputDebounce } from '../../../../InputDebounce/InputDebounce'
import { AddCardsModal } from '../../../../Modal/CardsModal/CardsModalForm/AddCardsModal'
import { ModeModalType } from '../../../../Modal/CardsModal/CustomCardsModal'
import { PaginationControlled } from '../../../../Pagination/Pagination'
import { SortArrow } from '../../../SortArrow/SortArrow'
import { MyIdActions } from '../../Actions/MyIdActions/MyIdActions'

import s from './Cards.module.css'

type Column = {
  id: 'question' | 'answer' | 'updated' | 'grade'
  label: string
  minWidth?: number
  align?: 'center'
  isSort?: boolean
}

const columns: Array<Column> = [
  { id: 'question', label: 'Question', minWidth: 170, align: 'center' },
  { id: 'answer', label: 'Answer', minWidth: 100, align: 'center' },
  {
    id: 'updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'center',
    isSort: true,
  },
  {
    id: 'grade',
    label: 'Grade',
    minWidth: 170,
    align: 'center',
  },
]

export const Cards = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [on, setOn] = useState<boolean>(false)
  const [modeModal, setModeModal] = useState<ModeModalType>('close')
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cards.cards)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const page = useAppSelector(state => state.paramsCard.page)
  const cardPackId = useAppSelector(state => state.paramsCard.cardsPack_id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const pageCount = useAppSelector(state => state.paramsCard.pageCount)
  const cardQuestion = useAppSelector(state => state.paramsCard.cardQuestion)
  const sortCard = useAppSelector(state => state.paramsCard.sortCards)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myId = useAppSelector(state => state.profile.user._id)
  const myCards = myId === packUserId
  const packEmpty = cards.length === 0
  const onChangePageCount = (value: number) => {
    dispatch(setPageCountCardsAC(value))
    dispatch(setPageCurrentCardsAC(1))
  }
  const setPage = (value: number) => {
    dispatch(setPageCurrentCardsAC(value))
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [pageCount, page, cardQuestion, sortCard])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  const findQuestionHandler = (filter: string) => {
    dispatch(setFilterQuestionCardAC(filter))
  }

  const onClickSortHandler = (value: number) => {
    dispatch(setSortCardAC(value + `updated`))
  }

  const handleOpen = () => {
    setOpen(!open)
    setModeModal('add')
  }

  const handleAddCard = (question: string, answer: string) => {
    dispatch(addCardTC(cardPackId, question, answer))
  }

  return (
    <div className={s.wrapper}>
      <BackPage title={'Packs List'} route={PATH.PACKS} />
      <h3 className={s.mainTitle}>{packName}</h3>
      {myCards ? (
        <Button variant="outlined" onClick={handleOpen}>
          Add Card
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            alert('Learn card')
          }}
        >
          Learn Card
        </Button>
      )}

      <AddCardsModal
        open={open}
        setOpen={setOpen}
        handleAddPack={handleAddCard}
        modeModal={modeModal}
        setModeModal={setModeModal}
      />
      {packEmpty ? (
        <div>This pack is empty. Click add new card to fill this pack</div>
      ) : (
        <>
          <div className={s.filter}>
            <InputDebounce width={1200} callback={findQuestionHandler} />
          </div>
          <div className={s.wrappers}>
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
                                sort={sortCard}
                                onClickSortHandler={onClickSortHandler}
                              />
                            ) : (
                              <div>{column.label}</div>
                            )}
                          </div>
                        </TableCell>
                      ))}
                      {myCards && <TableCell align="center">Actions</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cards.map(c => (
                      <TableRow key={c._id}>
                        <TableCell align="center">{c.question}</TableCell>
                        <TableCell align="center">{c.answer}</TableCell>
                        <TableCell align="center">
                          {new Date(c.updated).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">{c.rating}</TableCell>
                        {myCards && (
                          <TableCell align="center">
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
        </>
      )}
    </div>
  )
}
