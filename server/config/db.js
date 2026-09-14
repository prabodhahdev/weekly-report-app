const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

// stays alive across multiple serverless wake-ups
let isConnected = false;

const connectDB = async () => {
    // 1. If already connected, reuse the active connection instantly
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    try {
        console.log("Establishing fresh connection to MongoDB Atlas...");
        const db = await mongoose.connect(url, {
            // Limits the wait time to 5 seconds to prevent execution hangs
            serverSelectionTimeoutMS: 5000, 
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB is Connected");
    } catch (error) {
        console.log("MongoDB Connection Error:", error);
        throw error; 
    }
};

module.exports = connectDB;