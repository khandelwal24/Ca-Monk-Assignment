import mongoose from "mongoose";
import express from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import 'dotenv/config'


export const isAuthenticated = async(req,res,next) =>{
    try{
        const token = req.cookies.CookieToken || req.body.token;
        if(!token) return res.status(401).json({message:'Token not Found',success:false});
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            if(!decode) return res.status(401).json({message:'Invalid Token',success:false});
            req.id = decode.userId;
        }
        catch(error){
            return res.status(401).json({message:'Error Occured in isAuth',success:false});
        }
        next();
    }
    catch(error){
        return res.status(401).json({message:'User not Authenticated',success:false,error});
    }
}
