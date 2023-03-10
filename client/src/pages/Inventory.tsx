import { Table } from '@mui/joy'
import { Button, Pagination, Switch, TextField } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { CreateProduct } from '../components/CreateProduct'
import { Sidebar } from '../components/Sidebar'

export const Inventory = () => {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const [loading, setLoading] = useState(false)
  const [searchProduct, setSearchProduct] = useState("")

  useEffect(() => {
    getAllProducts()
  }, [])


  const getAllProducts = () => {
    axios.get(`${import.meta.env.VITE_ENDPOINT}getAllProducts`,
    {
      headers: {
        "x-access-token": token
      },
      params: {
        username
      }
    }).then(data => {
      setFilteredProducts(data.data.result)
      setAllProducts(data.data.result)
    })
  }

  const onStatusChange = (item: any) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },2000)
  }

  const onSearchProduct = () => {
    if(!searchProduct) {
      setFilteredProducts(allProducts)
    } else {
      const newAllProducts = [...allProducts]
      const filtered = newAllProducts.filter((product: any) => product.name.toLowerCase().includes(searchProduct.toLowerCase()))
      setFilteredProducts(filtered)
      setLoading(false)
    }
  }


  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-32 md:mb-20 text-lg font-semibold">INVENTORY</h3>
        <div className="flex items-center justify-between mb-10">
          <CreateProduct setAllProducts={setAllProducts} allProducts={allProducts} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} />
          <div className="flex">
            <TextField label="Search Product Name" variant="outlined" size="small" className="w-[300px] !mr-2" onChange={(e: any) => setSearchProduct(e.target.value)} />
            <Button color="primary" variant="contained" size="small" onClick={onSearchProduct}>Search</Button>
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
              <th>Description</th>
              <th>Price</th>
              <th>Type</th>
              <th>Expiration Date</th>
              <th>Active/Inactive</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredProducts.map((item: any, i) => (
                <tr key={item._id} className="even:bg-white odd:bg-slate-50">
                  <td>{item.name}</td>
                  <td>{item.description || "N/A"}</td>
                  <td>{item.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                  <td>{item.type || "N/A"}</td>
                  <td>{item.expiration_date ? dayjs(item.expiration_date).format("LL") : "N/A"}</td>
                  <td>
                    <Switch defaultChecked={item.active} disabled={loading} onChange={() => onStatusChange(item)} />
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
