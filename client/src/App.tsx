import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
   if(!isLoggedIn) {
    navigate("/login")
   }
  }, [])
  
  return (
    <div className="App">
      {/* 
        TODO
          Pages
            Signup/Login
            Dashboard
            Add Product
            Product List
              Update Product
            Reports
      */}
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h1>DASH BOARD</h1>
      </div>
    </div>
  )
}

export default App
