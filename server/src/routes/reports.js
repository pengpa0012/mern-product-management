const express = require("express")
const { Product } = require("../model")
const { verifyJWT } = require("../utils")
const router = express.Router()
const XLSX = require('xlsx')

router.get("/getReports", verifyJWT, async (req, res) => {
  const { username } = req.query
 // Find all documents in the YourModel collection
 await Product.find({username}).then(data => {
  console.log(data)
    // Convert the Mongoose documents to plain JavaScript objects
    const jsonData = JSON.parse(JSON.stringify(data))
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', 'attachment; filename=export.xlsx');
    res.send(excelBuffer);
  })
  .catch(console.error)
})

module.exports = router