import { Table } from '@mui/joy'
import { Button, Pagination, Switch, TextField } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Sidebar } from '../components/Sidebar'

export const Inventory = () => {
  const [allProducts, setAllProducts] = useState([])
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

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
      setAllProducts(data.data.result)
    })
  }, [])

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
              allProducts.map((item: any) => (
                <tr key={`item-${item.name}`} className="even:bg-white odd:bg-slate-50">
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.type}</td>
                  <td>{item.expiration_date ? dayjs(item.expiration_date).format("LL") : "N/A"}</td>
                  <td>
                    <Switch defaultChecked={item.active} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        {/* <div className="flex justify-end mt-6">
          <Pagination count={10} variant="outlined" shape="rounded" onChange={(event: React.ChangeEvent<unknown>, page: number) => console.log(page)} />
        </div> */}
      </div>
    </div>
  )
}
