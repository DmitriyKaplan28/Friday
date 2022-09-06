import React from 'react'

import SchoolIcon from '@mui/icons-material/School'
import { IconButton } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { FaChalkboardTeacher } from '@react-icons/all-files/fa/FaChalkboardTeacher'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../routing/Pages/Pages'
import { useAppSelector } from '../../../../store/store'
import { Actions } from '../Actions/Actions'
import s from '../Table.module.css'

export const CustomTableBody = () => {
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const user = useAppSelector(state => state.profile.user)
  const status = useAppSelector(state => state.app.status)
  const handleCardClick = () => {
    console.log('card')
  }

  return (
    <>
      {cardPacks.map(p => {
        return (
          <TableRow key={p._id}>
            <TableCell align="center" style={{ maxWidth: 170, overflow: 'hidden' }}>
              <NavLink className={s.userName} to={`${PATH.CARDS}?cardsPack_id=${p._id}`}>
                {p.name}
              </NavLink>
            </TableCell>
            <TableCell align="center">{p.cardsCount}</TableCell>
            <TableCell align="center">{new Date(p.updated).toLocaleDateString()}</TableCell>
            <TableCell align="center" style={{ maxWidth: 260, overflow: 'hidden' }}>
              {p.user_name}
            </TableCell>
            <TableCell align="center">
              {p.user_id === user._id ? (
                <Actions userId={p.user_id} packId={p._id} />
              ) : (
                <IconButton
                  disabled={status === 'loading'}
                  className={s.iconBtn}
                  onClick={handleCardClick}
                >
                  <NavLink to={`${PATH.CARDS}?cardsPack_id=${p._id}`}>
                    <SchoolIcon />
                  </NavLink>
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}
