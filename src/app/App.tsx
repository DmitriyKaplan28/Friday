import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { HashRouter } from 'react-router-dom'

import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { Header } from '../common/components/Header/Header'
import { Pages } from '../routing/Pages/Pages'
import { useAppDispatch, useAppSelector } from '../store/store'

import { appInitialTC } from './AppReducer'

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
      <HashRouter>
        <Header />
        <Pages />
      </HashRouter>
    </>
  )
}

export default App
//dev
