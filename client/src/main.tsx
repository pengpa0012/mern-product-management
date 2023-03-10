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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/inventory' element={<Inventory />} />
          {/* <Route path='/product-lists' element={<ProductLists />} /> */}
          <Route path='/reports' element={<Reports />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>,
)
