const express = require("express")
const { Product } = require("../model")
const { verifyJWT } = require("../utils")
const router = express.Router()

router.post("/createProduct", verifyJWT, async (req, res) => {
  const { name, description, image, type, price } = req.body

  const values = {
    name,
    description,
    image,
    type,
    price
  }

  const result = await Product.insertOne(values)

  if(result) {
    res.status(200).send({ message: "Added Product Successfully", result })
  } else {
    res.status(500).send({ message: "Added Product Failed" })
  }
})

router.post("/updateProduct", verifyJWT, async (req, res) => {
  const { _id, values } = req.body

  const result = Product.findByIdAndUpdate({_id}, {...values})

  if(result) {
    res.status(200).send({ message: "Update Product Successfully", result })
  } else {
    res.status(500).send({ message: "Update Product Failed" })
  }
})

router.post("/deleteProduct", verifyJWT, async (req, res) => {
  const { _id } = req.body
  
  const result = Product.deleteOne({_id})

  if(result) {
    res.status(200).send({ message: "Remove Product Successfully", result })
  } else {
    res.status(500).send({ message: "Remove Product Failed" })
  }
})


router.get("/getAllProducts", verifyJWT, async (req, res) => {
  const result = Product.find()

  if(result) {
    res.status(200).send({ result })
  } else {
    res.status(500).send({ message: "Error" })
  }
})

module.exports = router