import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose';

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import questionRoute from './routes/question.route.js'
import answerRoute from './routes/answer.route.js'

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
app.use(cors({ origin: ["http://localhost:5173","https://collegebuzz.vercel.app"], credentials: true }));
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/questions', questionRoute)
app.use('/api/answers', answerRoute)

app.use('/about', (req,res)=>{
    res.send("About: CollegeBuzz is a student-focused web platform where students can ask questions and get answers from experienced college seniors and alumni, helping them with their academic queries and providing valuable guidance.")
})


app.use('/', (req,res)=>{
    res.send("Reserved for CollegeBuzz")
})




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