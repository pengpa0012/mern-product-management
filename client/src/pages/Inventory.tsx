import { Table } from '@mui/joy'
import { Button, Pagination, Switch, TextField } from '@mui/material'
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
            <TextField label="Search Product" variant="outlined" size="small" className="w-[300px] !mr-2" />
            <Button color="primary" variant="contained" size="small">Search</Button>
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
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Expiration Date</th>
              <th>Active/Inactive</th>
            </tr>
          </thead>
          <tbody>
            {
              [1,2,3,4,5,6,7,8,9,10].map(item => (
                <tr key={item} className="even:bg-white odd:bg-slate-50">
                  <td>Frozen yoghurt</td>
                  <td>159</td>
                  <td>6</td>
                  <td>24</td>
                  <td>
                    <Switch />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <div className="flex justify-end mt-6">
          <Pagination count={10} variant="outlined" shape="rounded" onChange={(event: React.ChangeEvent<unknown>, page: number) => console.log(page)} />
        </div>
      </div>
    </div>
  )
}
