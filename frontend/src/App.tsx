
import './App.css'
import Dashboard from './Dashboard'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Error from './Error'

function App() {
 

  <Home/>
  return (
    <>
    <Router>
      <Routes>
        <Route   path='/' element={<Home/>}/>
        <Route   path='/dashboard' element={<Dashboard/>}/>
        <Route   path='/login' element={<Login/>}/>
        <Route   path='*' element={<Error/>}/>
        

      </Routes>
    </Router>
    </>
  )
}

export default App
