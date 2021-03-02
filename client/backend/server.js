const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const textRoute=require('./routes/text')

app.use(bodyParser.json())
app.use(cors())


app.use('/api',textRoute)

app.listen(5000,()=>console.log('server started'))