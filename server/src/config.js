const mongoose = require("mongoose")
require('dotenv').config()

const connect = mongoose.connect(process.env.MONGO_CONNECTION_STRING2)

connect.then(()=>{
    console.log("Database successfully connected")
}).catch(()=>{
    console.log("Database connection failed")
})

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require:true
    }
})

const collection = new mongoose.model("users", LoginSchema)

module.exports = collection