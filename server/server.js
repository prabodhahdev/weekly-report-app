console.log("SERVER.JS LOADED")
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const projectRoutes = require('./routes/projectRoutes')
const reportRoutes = require('./routes/reportRoutes')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Initialize express app
const app = express()

// Middlewares
app.use(cors(
    {origin: process.env.CLIENT_URL,
    credentials: true}
))
app.use(express.json())
app.use(cookieParser())

app.use(express.json())

//Connect the database
connectDB()

//Routes
app.get('/',(req,res)=>{
    res.send("Server is Running")
})
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/reports', reportRoutes)

//Start the server
const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server is running on port",port)
})