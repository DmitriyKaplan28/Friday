import React from 'react'

import { HashRouter } from 'react-router-dom'

import Header from './Header'
import Pages from './Pages'

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
