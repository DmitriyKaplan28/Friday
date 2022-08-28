import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { ErrorSnackbar } from '../common/features/c9-ErrorSnackbar/ErrorSnackbar'
import { PageRouting } from '../routing/PageRouting/PageRouting'
import { appInitialTC } from '../store/reducers/app-reducer'
import { useAppDispatch, useAppSelector } from '../store/reducers/signup-reducer'

function App() {
  const isInitialized = useAppSelector(state => state.app.initialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(appInitialTC())
  }, [dispatch])
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <ErrorSnackbar />
      <PageRouting />
    </div>
  )
}

export default App
