const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },

    email: {
        required: true,
        unique: true,
        type: String
    },

    password: {
        required: true,
        type: String
    },
    role:{
        required: true,
        type: String,
        enum:['member','manager']
    }
},
    {
        timestamps:true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User