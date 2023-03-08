import { Button, TextField } from '@mui/material'
import React from 'react'
import { Sidebar } from '../components/Sidebar'

export const Inventory = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-32 md:mb-20 text-lg font-semibold">INVENTORY</h3>
        <div className="flex justify-between mb-10">
          <div className="flex">
            <TextField label="Search Product" variant="outlined" className="w-[300px] !mr-4" />
            <Button color="primary" variant="contained">Search</Button>
          </div>
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
      </div>
    </div>
  )
}
