const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
app.use(bodyParser.json())


mongoose.connect(process.env.MONGO_CONNECTION_STRING)



const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number
})

const BookModel = mongoose.model("book", bookSchema)

app.get("/getBooks", (req, res) =>{
    BookModel.find({}).then(function(books){
        res.json(books)
    }).catch(function(err){
        console.log(err)
    })
})

app.post('/addBook', async (req, res) =>{
    const data = req.body
    try { 
        const savedData = await new BookModel(data).save()
        res.status(200).json({ message: "Correct Data", savedData})
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Wrong Data", error})
    }
})

//Todo :
//app.put()
//app.delete()



app.listen(3001, ()=>{
    console.log('Server is up')
})