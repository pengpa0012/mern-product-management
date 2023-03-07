import { Button, Grid, MenuItem, Paper, Select, TextField } from '@mui/material'
import React from 'react'
import { Sidebar } from '../components/Sidebar'

export const Reports = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-12 md:mb-20 text-lg font-semibold">REPORTS</h3>
        <div className="grid place-items-center">
          <Paper className="px-8 py-12 mt-20 w-[400px]" elevation={3}>
            <h1 className="text-center text-2xl mb-4">Reports</h1>
            <Select
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
            </Select>
            <div className="flex">
              <Button className="flex-1" color="info">Cancel</Button>
              <Button variant="contained" color="primary" className="!ml-2 flex-1">Download</Button>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  )
}
