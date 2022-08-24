import React from 'react'
import Header from './Header'
import Pages from './Pages'
import { HashRouter } from 'react-router-dom'
import s from './Page.module.css'

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
