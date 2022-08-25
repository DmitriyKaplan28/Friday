import React, { useEffect } from 'react'
import './App.css'
import PageRouting from './routing/PageRouting'
import { ErrorSnackbar } from './common/c9-ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch, useAppSelector } from './reducers/signup-reducer'
import { appInitialTC } from './reducers/app-reducer'
import { CircularProgress } from '@mui/material'

function App() {
  const isInitialized = useAppSelector((state) => state.app.initialized)
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
