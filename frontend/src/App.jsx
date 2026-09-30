import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Products from './Pages/Products/Products'
import ProductsDetails from './Pages/Products/ProductsDetails'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<Products/>} />
        <Route path='/products/:id' element={<ProductsDetails/>}/>
      </Routes>
    </>
  )
}

export default App