import { Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export const Reports = () => {
  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token")
  const [loading, setLoading] = useState(false)

  // const onDownloadReports = () => {
  //   setLoading(true)
  //   axios.get(`${import.meta.env.VITE_ENDPOINT}getReports`,
  //   {
  //     headers: {
  //       "x-access-token": token
  //     },
  //     params: {
  //       username
  //     }
  //   }).then((data) => {
  //     console.log(data)
  //     setTimeout(() => {
  //       setLoading(false)
  //     }, 2000)
  //   }).catch(console.error)
  // }

  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-12 md:mb-20 text-lg font-semibold">REPORTS</h3>
        <div className="grid place-items-center">
          <Paper className="px-8 py-12 mt-20 w-[400px]" elevation={3}>
            <h1 className="text-center text-2xl mb-4">Reports</h1>
            {/* <Select
              defaultValue={10}
              className="w-full"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Select
              defaultValue={10}
              className="w-full my-4"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
            <Button variant="contained" color="primary" className="w-full" disabled={loading}>Download</Button>
          </Paper>
        </div>
      </div>
    </div>
  )
}
