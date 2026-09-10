const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Initialize express app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//Connect the database
connectDB()

//Routes
app.get('/',(req,res)=>{
    res.send("Server is Running")
})
app.use('/api/auth', authRoutes)

//Start the server
const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server is running on port",port)
})