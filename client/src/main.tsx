import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import { Inventory } from './pages/Inventory'
import { Login } from './pages/Login'
import { ProductLists } from './pages/ProductLists'
import { Register } from './pages/Register'
import { Reports } from './pages/Reports'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
const resolution = window.innerWidth
const isMobile = resolution <= 768

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isMobile ? <h1 className="text-center">Not supported on mobile</h1> : <App />} />
          <Route path='/login' element={isMobile ? <h1 className="text-center">Not supported on mobile</h1> : <Login />} />
          <Route path='/register' element={isMobile ? <h1 className="text-center">Not supported on mobile</h1> : <Register />} />
          <Route path='/inventory' element={isMobile ? <h1 className="text-center">Not supported on mobile</h1> : <Inventory />} />
          {/* <Route path='/product-lists' element={<ProductLists />} /> */}
          {/* <Route path='/reports' element={<Reports />} /> */}
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>,
)
