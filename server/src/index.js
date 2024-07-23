const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const collection = require("./config")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')

app.get('/login', (req, res) =>{
    res.render("login")
})

app.get('/signup', (req, res) =>{
    res.render("signup")
})

app.post('/signup', async (req, res) =>{

    const data ={
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collection.findOne({name: data.name})
    if(existingUser){
        res.send("User already exists, try another username!")
    }else{
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }
    
})


app.listen(5000, ()=>{
    console.log('Server is up on 5000')
})