import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Grid, Paper } from '@mui/material'
import AllInboxIcon from '@mui/icons-material/AllInbox';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

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
      count: "123",
      icon: <AllInboxIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Overall Price",
      count: "123",
      icon: <AttachMoneyIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Expired Items",
      count: "123",
      icon: <HourglassDisabledIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Expiring Items",
      count: "123",
      icon: <QueryBuilderIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Active Items",
      count: "123",
      icon: <CheckBoxOutlinedIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Inactive Items",
      count: "123",
      icon: <IndeterminateCheckBoxOutlinedIcon className="!text-5xl text-gray-700" />
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
            <Grid item xs={12} md={4} key={`dashboard-${i}`}>
              <Paper elevation={3} className="h-[300px] grid place-items-center rounded-md">
                <div className="text-center">
                  {dashboard.icon}
                  <h2 className="text-xl my-2">{dashboard.title}</h2>
                  <p className="text-6xl text-gray-700 font-bold">{dashboard.count}</p>
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
