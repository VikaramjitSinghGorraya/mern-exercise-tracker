const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path")
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
 
const uri = process.env.ATLAS_URI
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully")
})

const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users')

app.use('/exercises',exerciseRouter)
app.use('/users',userRouter)

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})