import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import UserR from './Routes/UserRoutes.js'
import BlogR from './Routes/BlogRoutes.js'

const app = express();

//middlewares:
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:['GET','POST','DELETE','PUT']
}));


// All the Routing
app.use('/api/v1/user',UserR);
app.use('/api/v1',BlogR);


// Database Connection & PORT
const port = process.env.PORT || 1000;
mongoose.connect(process.env.MONGO_URI,{dbName:'Blog_monk'}).then(()=>console.log('MongoDB Connected Successfully')).catch(()=>console.log('Error Occured in Connecting DB'));
app.listen(port,()=>console.log(`Server is Running on port ${port}`));