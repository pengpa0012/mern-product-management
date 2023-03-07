import { Grid, MenuItem, Paper, Select, Slider, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export const ProductLists = () => {
  const [value, setValue] = useState<number[]>([0, 10])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-12 md:mb-20 text-lg font-semibold">PRODUCT LISTS</h3>
        <div className="flex justify-between mb-10">
          <TextField label="Search Product" variant="outlined" className="w-[300px]" />
          {/* <div>
            <Select
              className="w-[200px]"
              defaultValue={10}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={(valuetext) => `${valuetext}°C`}
            />
          </div> */}
        </div>
        <Grid container spacing={3}>
        {[1,2,3,4].map(item => (<Grid item xs={12} md={6} lg={3}>
             <Paper elevation={3}>
                <img src="https://via.placeholder.com/200x200" className="w-full rounded-md" />
                {/* <div className="text-center">
                  <h2 className="text-lg mb-4">test</h2>
                  <p className="text-6xl text-gray-700">test</p>
                </div> */}
              </Paper>
          </Grid>))}
        </Grid>
      </div>
    </div>
  )
}
