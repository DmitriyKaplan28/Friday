import React from 'react'

import { Button, dividerClasses, IconButton, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { logoutTC } from '../../reducers/auth-reducer'
import { AppRootStateType, useAppDispatch } from '../../store/store'
import { PATH } from '../Pages'

function Profile() {
  const isLoggedIn = useSelector((state: AppRootStateType) => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logoutTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div>
      <div>Profile</div>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">I am logged in!</Typography>
        {isLoggedIn && (
          <Button onClick={handleLogout} color="primary">
            Log out
          </Button>
        )}
      </Toolbar>
    </div>
  )
}

export default Profile

// сделайте по аналогии пустые страницы джун и джун+
// туда будут добавляться следующие дз
