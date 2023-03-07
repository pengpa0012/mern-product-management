import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Grid, Paper } from '@mui/material'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
   if(!isLoggedIn) {
    navigate("/login")
   }
  }, [])

  const dashboardList = [
    {
      title: "Total Items",
      count: "123"
    },
    {
      title: "Overall Price",
      count: "123"
    },
    {
      title: "Total Expired Items",
      count: "123"
    },
    {
      title: "Total Expiring Items",
      count: "123"
    },
  ]
  
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
        <h3 className="mb-12 md:mb-20 text-lg font-semibold">DASHBOARD</h3>
        <Grid container spacing={3}>
          {dashboardList.map((dashboard, i) => (
            <Grid item xs={12} md={6} key={`dashboard-${i}`}>
              <Paper elevation={3} className="h-[300px] grid place-items-center">
                <div className="text-center">
                  <h2 className="text-lg mb-4">{dashboard.title}</h2>
                  <p className="text-6xl text-gray-700">{dashboard.count}</p>
                </div>
              </Paper>
            </Grid>
            ))
          }
        </Grid>
      </div>
    </div>
  )
}

export default App
