var mongoose = require("mongoose")
require('dotenv').config();

var connection = mongoose.connect(process.env.DB_URL)

if(connection) {
    console.log("Successfully connected to DB")
}

else {
    console.log("Failed to connect to DB")
}