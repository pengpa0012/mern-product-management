const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const productSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: String
  },
})

module.exports = {
  Users: mongoose.model('user', userSchema),
  Product: mongoose.model('product', productSchema),
}