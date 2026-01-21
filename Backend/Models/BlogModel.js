import express from 'express'
import mongoose from 'mongoose'

const Blog_Schema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    category:[{type:String,required:true}],
    description:{type:String,required:true},
    coverImage:{type:String,required:true},
    content:{type:String,required:true},
    tags:[{type:String,required:true}],
    writtenBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});
export const BlogModel = mongoose.model('Blog',Blog_Schema);
