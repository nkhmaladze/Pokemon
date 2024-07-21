const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()
//dot file this shit
mongoose.connect(process.env.MONGO_CONNECTION_STRING)

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number
})

const BookModel = mongoose.model("books", BookSchema)

app.get("/getBooks", (req, res) =>{
    BookModel.find({}).then(function(books){
        res.json(books)
    }).catch(function(err){
        console.log(err)
    })
})

//app.put()
//app.post()
//app.delete()



app.listen(3001, ()=>{
    console.log('Server is up')
})