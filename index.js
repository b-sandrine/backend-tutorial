var express = require("express")
var cors = require("cors")
require('dotenv').config()

var app = express();

const PORT = process.env.PORT || 6000

app.get("/",(req,res) => {
    res.send("Welcome to backend")
})

app.listen(PORT, () => {
    console.log("http://localhost:"+PORT)
})