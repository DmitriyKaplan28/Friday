import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../routing/Pages/Pages'
import {
  setCardsPackIdAC,
  setPageCurrentCardsAC,
} from '../../../../store/reducers/CardsParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { ModeModalType } from '../../Packs'
import { Actions } from '../Actions/Actions'
import s from '../Table.module.css'

export type CustomTableBodyType = {
  modeModal: ModeModalType
  setModeModal: (value: ModeModalType) => void
}
export const CustomTableBody = (props: CustomTableBodyType) => {
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleCardClick = () => {
    console.log('card')
  }

  const onClickHandlerName = (id: string) => {
    dispatch(setPageCurrentCardsAC(1))
    dispatch(setCardsPackIdAC(id))
    navigate(PATH.CARDS)
  }

  const onClickHandler = () => {}

  return (
    <>
      {cardPacks.map(p => {
        return (
          <TableRow key={p._id}>
            <TableCell align="center" style={{ maxWidth: 170, overflow: 'hidden' }}>
              <div className={s.userName} onClick={() => onClickHandlerName(p._id)}>
                {p.name}
              </div>
            </TableCell>
            <TableCell align="center">{p.cardsCount}</TableCell>
            <TableCell align="center">{new Date(p.updated).toLocaleDateString()}</TableCell>
            <TableCell align="center" style={{ maxWidth: 260, overflow: 'hidden' }}>
              {p.user_name}
            </TableCell>
            <TableCell align="center">
              {p.user_id === user._id ? (
                <Actions
                  userId={p.user_id}
                  packId={p._id}
                  modeModal={props.modeModal}
                  setModeModal={props.setModeModal}
                />
              ) : (
                <IconButton
                  disabled={status === 'loading'}
                  className={s.iconBtn}
                  onClick={handleCardClick}
                >
                  <div onClick={onClickHandler}>
                    <SchoolIcon />
                  </div>
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
