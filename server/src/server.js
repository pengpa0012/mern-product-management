const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const http = require('http')
const server = http.createServer(app)

const cors = require("cors")
const connectDB = require("./config/db")
const accountRoutes = require("./routes/account")
const productRoutes = require("./routes/product")
const reportsRoutes = require("./routes/reports")

connectDB()

// Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use("/", accountRoutes)
app.use("/", productRoutes)
app.use("/", reportsRoutes)

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
