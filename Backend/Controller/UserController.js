import mongoose from "mongoose";
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import 'dotenv/config'
import { UserModel } from "../Models/UserModel.js";

export const register = async(req,res)=>{
    try{    
        const {username,email,password} = req.body;
        if(!username || !email || !password || password.length < 8) return res.status(401).json({message:'Something is missing or Password length < 8',success:false});

        let respo = await UserModel.findOne({email});
        if(respo) return res.status(401).json({message:'This Email Already Exists',success:false});

        const hashPass = await bcrypt.hash(password,10);
        respo = await UserModel.create({username,email,password:hashPass});
        return res.status(200).json({message:'User Registered Successfully',success:true,respo});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in Registeration',success:false,error});
    }
};

export const login = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email || !password) return res.status(401).json({message:'Something is missing',success:false});

        let rsp = await UserModel.findOne({email});
        if(!rsp) return res.status(401).json({message:'This email not exist in database',success:false});

        let verifyPass = await bcrypt.compare(password,rsp.password);
        if(!verifyPass) return res.status(401).json({message:'Invalid Password',success:false});

        const payload = {
            userId:rsp._id,
            userEmail:rsp.email,
        }

        const token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1d'});
        
        const options = {
            httpOnly:true,
            sameSite:'strict',
            maxAge: new Date(Date.now() + 1*24*60*60*1000),
        }

        rsp = rsp.toObject();
        rsp.token = token;
        rsp.password = undefined;

        return res.status(200).cookie('CookieToken',token,options).json({message:`User Login Successful - Welcome ${rsp.username}`,success:true,rsp});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in Login',success:false,error});
    }
};

export const logout = async(req,res)=>{
    try{
        return res.cookie('CookieToken','',{maxAge:0}).status(200).json({message:'User Logged Out Successfully',success:true});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in Logging Out',success:false, error});
    }
};