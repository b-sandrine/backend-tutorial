var mongoose = require("mongoose")
require('dotenv').config();

async function connect() {

    var connection = await mongoose.connect(process.env.DB_URL)

    if(connection) {
        console.log("Successfully connected to DB")
    }

    else {
        console.log("Failed to connect to DB")
    }
}

module.exports = connect;