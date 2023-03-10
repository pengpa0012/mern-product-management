import { Box, Button, IconButton, MenuItem, Modal, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Notiflix from 'notiflix';
import axios from 'axios';
import { bytesToSize } from '../utilities';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../utilities/firebase';
import { v4 } from "uuid";

export const CreateProduct = ({setAllProducts, allProducts, setFilteredProducts, filteredProducts, isUpdate, opened}: any) => {
  const [previewIMG, setPreviewIMG] = useState("")
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<any>({
    image: "",
    name: "",
    price: "",
    type: "",
    expiration_date: "",
    description: ""
  })
  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token")
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setPreviewIMG("")
    setProduct({})
  }

  const onImageUpload = (image: File) => {
    if(image) {
      const blob = window.URL.createObjectURL(image)
      setPreviewIMG(blob)
      setProduct({...product, image})
    }
  }

  const onCreateProduct = () => {
    const { name, price, type, image, expiration_date, description } = product

    if(!name || !price) {
      return Notiflix.Notify.failure("Complete required fields!")
    }

    if(bytesToSize(image.size).includes("MB")) {
      Notiflix.Notify.failure("Image size must be under 1MB")
      return
    }

    const imageRef = ref(storage, `${image.name + v4()}`)

    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        axios.post(`${import.meta.env.VITE_ENDPOINT}createProduct`, {
          name,
          image: url,
          username,
          expiration_date,
          description,
          type,
          price
        },
        {
          headers: {
            "x-access-token": token
          }
        })
        .then(response => {
          setAllProducts([...allProducts, response.data.result])
          setFilteredProducts([...filteredProducts, response.data.result])
          Notiflix.Notify.success(response.data.message)
          setOpen(false)
          setProduct({})
        })
        .catch((err) => {
          console.log(err)
          Notiflix.Notify.failure(err.response.data.message)
        })
      })
    })
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size="small">Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="grid place-items-center overflow-y-scroll py-6"
      >
        <Box className="bg-white rounded-md p-6 flex flex-col gap-3">
          <img src={previewIMG || "https://via.placeholder.com/300x300"} className="w-full max-w-[458px] max-h-[458px] rounded-md" />
          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" type="file" onChange={(e) => onImageUpload(e.target.files![0])} />
          </Button>
          <div className="flex gap-3">
            <TextField required label="Name" onChange={(e) => setProduct({...product, name: e.target.value})} />
            <TextField required type="number" label="Price" onChange={(e) => setProduct({...product, price: e.target.value})} />
          </div>
          <Select
            defaultValue="N/A"
            className="w-full"
            required
            onChange={(e) => setProduct({...product, type: e.target.value})}
          >
            <MenuItem value="N/A">N/A</MenuItem>
            <MenuItem value="Consumable">Consumable</MenuItem>
            <MenuItem value="Non-Consumable">Non-Consumable</MenuItem>
          </Select>
          {
            product.type == "Consumable" &&
            <DatePicker label="Expiration Date" onChange={(e: any) => setProduct({...product, expiration_date: dayjs(e.$d)})} />
          }
          <Textarea placeholder="Description" minRows={3} onChange={(e) => setProduct({...product, description: e.target.value})} />
          <div className="flex gap-3">
            <Button onClick={handleClose} className="w-full">Cancel</Button>
            <Button variant="contained" color="primary" className="w-full" onClick={onCreateProduct}>Confirm</Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
