var express = require("express")
var cors = require("cors")
var connect = require('./src/config/connection')
const { json } = require('express')
const path = require('path')
var bodyParser = require('body-parser')


var app = express();
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

app.use(cors())

app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

// app.use(json())


// requiring dotenv & loading env variables 
require('dotenv').config()

//connect to DB
connect();

var router = require('./src/routes/user.routes')

app.get("/",(req,res) => {
    // res.send("Welcome to backend")
    res.render('index')
})

app.get("/login", (req,res) => {
    res.render('pages/login')
})

app.get("/signup", (req,res) => {
    res.render('pages/signup')
})

app.use('/api/users',router);

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log("http://localhost:"+PORT)
})