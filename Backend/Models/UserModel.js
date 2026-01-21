import express from 'express'
import mongoose from 'mongoose'

const User_Schema = new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    blogs:[{type:mongoose.Schema.Types.ObjectId,ref:'Blog'}]
},{timestamps:true});
export const UserModel = mongoose.model('User',User_Schema);