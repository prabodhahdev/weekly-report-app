const dotenv = require('dotenv')
const express = require('express')

dotenv.config()

const app = express()

app.get('/',(req,res)=>{
    res.send("Server is Running")
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server is running on port",port)
})