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
        const salt = 10
        const hashedPassword = await bcrypt.hash( data.password, salt )
        data.password = hashedPassword
        
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }
})

app.post("/login", async (req, res) =>{
    try{
        const check = await collection.findOne({ name: req.body.username })
        if (!check){
            res.send("This username does not exist")
        }

        const doesPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if(doesPasswordMatch){
            res.render("home")
        }else{
            req.send("Incorrect Password")
        }
    }catch{
        res.send("Wront login details")
    }
})




app.listen(5000, ()=>{
    console.log('Server is up on 5000')
})