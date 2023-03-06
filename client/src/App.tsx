import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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
      
    </div>
  )
}

export default App
