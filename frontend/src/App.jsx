import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App