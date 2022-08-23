import React from 'react'
import './App.css'
import PageRouting from './routing/PageRouting'
import { ErrorSnackbar } from './common/c9-ErrorSnackbar/ErrorSnackbar'

function App() {
  return (
    <div>
      <ErrorSnackbar />
      <PageRouting />
    </div>
  )
}

export default App
