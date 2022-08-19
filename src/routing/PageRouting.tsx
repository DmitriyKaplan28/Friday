import React from 'react'
import Header from './Header'
import Pages from './Pages'
import { HashRouter } from 'react-router-dom'

function PageRouting() {
  return (
    <div>
      <HashRouter>
        <Header />

        <Pages />
      </HashRouter>
    </div>
  )
}

export default PageRouting
