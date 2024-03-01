const mongoose = require('mongoose')
require('dotenv').config()


connection = mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
}).then(()=>{
    console.log("Database Connected.")
}).catch(()=>{console.log("Connection Failed.")})

module.exports = connection