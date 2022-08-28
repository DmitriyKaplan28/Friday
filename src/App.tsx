import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { ErrorSnackbar } from './common/c9-ErrorSnackbar/ErrorSnackbar'
import { appInitialTC } from './reducers/app-reducer'
import { PageRouting } from './routing/PageRouting'
import { useAppDispatch, useAppSelector } from './store/store'

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
    <>
      <ErrorSnackbar />
      <PageRouting />
    </>
  )
}

export default App
