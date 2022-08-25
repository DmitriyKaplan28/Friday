import React from 'react'

import { HashRouter } from 'react-router-dom'

import Header from './Header'
import s from './Page.module.css'
import Pages from './Pages'

function PageRouting() {
  return (
    <div className={s.page}>
      <HashRouter>
        <Header />

        <Pages />
      </HashRouter>
    </div>
  )
}

export default PageRouting
