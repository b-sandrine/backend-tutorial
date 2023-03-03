var express = require("express")
var cors = require("cors")
var connect = require('./src/config/connection')
const { json } = require('express')

var app = express();

// requiring dotenv & loading env variables 
require('dotenv').config()

//connect to DB
connect();

var router = require('./src/routes/user.routes')

app.use(cors())
app.use(json())

app.get("/",(req,res) => {
    res.send("Welcome to backend")
})

app.use('/api/users',router);



const PORT = process.env.PORT || 7000


app.listen(PORT, () => {
    console.log("http://localhost:"+PORT)
})