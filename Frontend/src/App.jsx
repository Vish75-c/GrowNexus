import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Auth from './pages/Auth'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={Auth}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
