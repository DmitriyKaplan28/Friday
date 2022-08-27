import React from 'react'

import { HashRouter } from 'react-router-dom'

import { ErrorSnackbar } from '../common/c9-ErrorSnackbar/ErrorSnackbar'

import s from './Page.module.css'
import Pages from './Pages'
import { Header } from './pages/Header/Header'

export const PageRouting = () => (
  <div className={s.page}>
    <HashRouter>
      <Header />

      <Pages />
    </HashRouter>
    <ErrorSnackbar />
  </div>
)
