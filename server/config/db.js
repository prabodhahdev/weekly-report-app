const mongoose = require('mongoose')

const url = process.env.MONGO_URI
const connectDB = async()=>{
    try {
        await mongoose.connect(url)
        console.log("MongoDB is Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports =  connectDB