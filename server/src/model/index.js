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
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  type: {
    type: String
  },
  price: {
    type: String
  },
  active: {
    type: Boolean
  }
})

module.exports = {
  Users: mongoose.model('user', userSchema),
  Product: mongoose.model('product', productSchema),
}