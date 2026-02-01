import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Auth from './pages/Auth'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={LandingPage}/>
      <Route path='/auth' element={Auth}/>
      <Route path='/profile' element={Profile}/>
      <Route path='/dashboard' element={Dashboard}/>

      <Route path='*' element={Auth}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
