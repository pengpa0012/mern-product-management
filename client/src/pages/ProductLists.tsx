import { Button, Grid, MenuItem, Paper, Select, Slider, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CreateProduct } from '../components/CreateProduct'
import { Sidebar } from '../components/Sidebar'

export const ProductLists = () => {
  const [value, setValue] = useState<number[]>([0, 10])
  const [allProducts, setallProducts] = useState([])
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

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
      setallProducts(data.data.result)
    })
  }, [])

  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-12 md:mb-20 text-lg font-semibold">PRODUCT LISTS</h3>
        <CreateProduct />
        <Grid container spacing={3}>
        {allProducts.map((item: any) => (
          <Grid item xs={12} md={6} lg={3} key={item}>
             <Paper elevation={3}>
                <img src={"https://via.placeholder.com/200x200"} className="w-full rounded-md" />
                {/* <div className="text-center">
                  <h2 className="text-lg mb-4">{item.name}</h2>
                  <p className="text-6xl text-gray-700">{item.price}</p>
                </div> */}
              </Paper>
          </Grid>
        ))}
        </Grid>
      </div>
    </div>
  )
}
