import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import mongoose from 'mongoose';
const app = express()
dotenv.config()
mongoose.set('strictQuery',true)

const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
    
    }catch(err){
        console.log(err)
    }
}
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json())
app.use(cookieParser())



app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went Wrong"
    return res.status(errStatus).send(errMessage)
})


const port = process.env.PORT || 8800
app.listen(port,()=>{
    connect()
    console.log(`Backend is Running at ${port}`)
})