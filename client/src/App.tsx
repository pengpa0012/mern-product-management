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
import axios from 'axios'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigate = useNavigate()
  const [allProducts, setAllProducts] = useState({
    items: 0,
    price: 0,
    active: 0,
    inactive: 0
  })
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  
  useEffect(() => {
   if(!isLoggedIn) {
    navigate("/login")
   }
  }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}getAllProducts`,
    {
      headers: {
        "x-access-token": token
      },
      params: {
        username
      }
    }).then(data => {
      // add expiring and expired items
      // expiring 1 month before
      setAllProducts({
        ...allProducts,
        items: data.data.result.length,
        price: data.data.result.reduce((acc: any, val: any) => acc + Number(val.price), 0),
        inactive: data.data.result.reduce((acc: any, val: any) => acc + Number(val.active == false), 0),
        active: data.data.result.reduce((acc: any, val: any) => acc + Number(val.active), 0)
      })
    }).catch(console.error)
  }, [])

  const dashboardList = [
    {
      title: "Total Items",
      count: allProducts.items,
      icon: <AllInboxIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Overall Price",
      count: `₱${allProducts.price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`,
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
      count: allProducts.active,
      icon: <CheckBoxOutlinedIcon className="!text-5xl text-gray-700" />
    },
    {
      title: "Inactive Items",
      count: allProducts.inactive,
      icon: <IndeterminateCheckBoxOutlinedIcon className="!text-5xl text-gray-700" />
    },
  ]
  
  return (
    <div className="App">
      {/* 
        TODO
          Dashboard Queries
          Image upload
          Product active/inactive
          Product delete/update
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
