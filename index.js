require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connenction')

 const pfServer=express()
 pfServer.use(cors())
 pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))

 const PORT = 3000 || process.env.PORT
 pfServer.listen(PORT,()=>{
    console.log(`Project Fair Server started at port : ${PORT} and waiting For Client Request`);
    
 })
 pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red"> Project Fair Server started and waiting For Client Request </h1>`)
 })
//  pfServer.get('/',(req,res)=>{
//     res.status(200).send(`<h1 style="color:red"> Project Fair Server started and waiting For Client Request </h1>`)
//  })