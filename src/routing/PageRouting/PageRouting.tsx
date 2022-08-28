import React from 'react'

import { HashRouter } from 'react-router-dom'

import { Header } from '../../components/Header/Header'

import s from './PageRouting.module.css'
import { Pages } from './Pages/Pages'

export function PageRouting() {
  return (
    <div className={s.page}>
      <HashRouter>
        <Header />

        <Pages />
      </HashRouter>
    </div>
  )
}
