import { Table } from '@mui/joy'
import { Button, Drawer, Pagination, Popover, Switch, TextField } from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { CreateProduct } from '../components/CreateProduct'
import { Sidebar } from '../components/Sidebar'
import { bytesToSize } from '../utilities'
import { storage } from '../utilities/firebase'

export const Inventory = () => {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const [loading, setLoading] = useState(false)
  const [searchProduct, setSearchProduct] = useState("")
  const [openDrawer, setOpenDrawer] = useState(false)
  const [previewIMG, setPreviewIMG] = useState("")
  const [productProfile, setProductProfile] = useState<any>({})
  const [updateImage, setUpdateImage] = useState<File | undefined>()

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
    }).catch(console.error)
  }

  const onStatusChange = (item: any, active: boolean) => {
    setLoading(true)
    setTimeout(() => {
      axios.post(`${import.meta.env.VITE_ENDPOINT}updateProduct`,
      {
        _id: item._id,
        values: {
          ...item,
          active: active
        }
      },
      {
        headers: {
          "x-access-token": token
        }
      }).then(data => {
        Notiflix.Notify.success("Updated status!")
      }).catch(console.error)
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

  const onImageUpload = (image: File) => {
    if(image) {
      const blob = window.URL.createObjectURL(image)
      setPreviewIMG(blob)
      setUpdateImage(image)
    }
  }

  const onDeleteProduct = (e: any, item: any) => {
    e.stopPropagation()
    Notiflix.Confirm.show(
      'Delete Product',
      'Are you sure?',
      'Delete',
      'Cancel',
      function okCb() {
        axios.post(`${import.meta.env.VITE_ENDPOINT}deleteProduct`,
        {
          _id: item._id
        },
        {
          headers: {
            "x-access-token": token
          }
        }).then(data => {
          const updatedProducts = [...allProducts]
          const filtered = updatedProducts.filter((product: any) => product._id !== item._id)
          setFilteredProducts(filtered)
          Notiflix.Notify.success("Deleted Product!")
        }).catch(console.error)
      },
      function cancelCb() {
      },
      {
        titleColor: '#fff',
        backgroundColor: "#242424",
        messageFontSize: '18px',
        messageColor: "#fff",
        okButtonBackground: '#ef4444'
      },
    )
  }

  const onUpdateImage = () => {
    const { name, price, expiration_date, image,  type, description, date, _id } = productProfile
    if(updateImage) {
      if(bytesToSize(updateImage?.size).includes("MB")) {
        Notiflix.Notify.failure("Image size must be under 1MB")
        return
      }

      if(image){
        const deletedImg = ref(storage, `${image.split("/").at(-1).split("?")[0]}`)
        deleteObject(deletedImg)
      }
  
      const imageRef = ref(storage, `${updateImage.name + v4()}`)
  
      uploadBytes(imageRef, updateImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          axios.post(`${import.meta.env.VITE_ENDPOINT}updateProduct`, {
            username,
            values: {
              name,
              price,
              expiration_date,
              date,
              type,
              description,
              image: url,
            }
          },
          {
            headers: {
              "x-access-token": token
            }
          })
          .then(response => {
            Notiflix.Notify.success("Image Updated!")
            setUpdateImage(undefined)
            const newAllProducts: any = [...allProducts]
            const findIndex = allProducts.findIndex((item: any) => item._id == _id)
            newAllProducts[findIndex].image = url
            setAllProducts(newAllProducts)
            setFilteredProducts(newAllProducts)
          })
          .catch((err) => {
            console.log(err)
            Notiflix.Notify.failure(err.response.data.message)
          })
        })
      })
    }
  }

  return (
    <div>
      <Sidebar />
      <div className="ml-[300px] p-4">
        <h3 className="mb-32 md:mb-20 text-lg font-semibold">INVENTORY</h3>
        <div className="flex items-center justify-between mb-10">
          <div className="flex">
            <TextField label="Search Product Name" variant="outlined" size="small" className="w-[300px] !mr-2" onChange={(e: any) => setSearchProduct(e.target.value)} />
            <Button color="primary" variant="contained" size="small" onClick={onSearchProduct}>Search</Button>
          </div>
          <CreateProduct setAllProducts={setAllProducts} allProducts={allProducts} setFilteredProducts={setFilteredProducts} filteredProducts={filteredProducts} />
        </div>
        <Table aria-label="basic table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Active/Inactive</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredProducts.map((item: any, i) => (
                <tr key={item._id} className="even:bg-white odd:bg-slate-50 cursor-pointer hover:bg-slate-100" onClick={() => {
                  setOpenDrawer(true)
                  setProductProfile(item)
                }}>
                  <td>{item.name}</td>
                  <td>&#8369;{item.price?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                  <td>{item.type || "N/A"}</td>
                  <td>
                    <Switch defaultChecked={item.active} onClick={e => e.stopPropagation()} disabled={loading} onChange={(e, checked) =>{
                      onStatusChange(item, checked)
                    }} />
                  </td>
                  <td>
                    <Button color="error" variant="contained" size="small" className="!mr-2" onClick={(e: any) => onDeleteProduct(e, item)}>Delete</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Drawer
          open={openDrawer}
          anchor="right"
          onClose={() => {
            setOpenDrawer(false)
            setPreviewIMG("")
          }}
        >
          <div className="!w-[500px] p-6">
            <img src={previewIMG || productProfile.image || "https://via.placeholder.com/300x300"} className="w-full max-h-[458px] rounded-md" />
            <div className="my-4">
              {!updateImage &&
                <Button variant="contained" component="label" className="w-full !mb-2">
                  Upload
                  <input hidden accept="image/*" type="file" onChange={(e) => onImageUpload(e.target.files![0])} />
                </Button>
              }
              {updateImage &&
                <div className="flex">
                  <Button variant="text" component="label" className="w-full !mr-2" onClick={() => setPreviewIMG("")}>Cancel</Button>
                  <Button variant="contained" color="success" component="label" className="w-full" onClick={() => onUpdateImage()}>Save</Button>
                </div>
              }
            </div>
            {/* {!isUpdate && <Button variant="contained" component="label" className="w-full !my-4" onClick={() => setIsUpdate(true)}>Update</Button>} */}
            <ul className="my-2">
              <li className="mb-2 text-lg">Name: {productProfile.name}</li>
              <li className="mb-2 text-lg">Description: {productProfile.description}</li>
              <li className="mb-2 text-lg">Price: &#8369;{productProfile.price?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</li>
              <li className="mb-2 text-lg">Type: {productProfile.type || "N/A"}</li>
              <li className="mb-2 text-lg">Expiration Date: {productProfile.expiration_date ? dayjs(productProfile.expiration_date).format("LL") : "N/A"}</li>
            </ul>
            {/* {isUpdate && 
              <div className="flex">
                <Button variant="text" component="label" className="w-full !mr-2" onClick={() => setIsUpdate(false)}>Cancel</Button>
                <Button variant="contained" component="label" className="w-full" onClick={() => setIsUpdate(false)}>Save</Button>
              </div>
            } */}
          </div>
        </Drawer>
        {/* <div className="flex justify-end mt-6">
          <Pagination count={10} variant="outlined" shape="rounded" onChange={(event: React.ChangeEvent<unknown>, page: number) => console.log(page)} />
        </div> */}
      </div>
    </div>
  )
}
