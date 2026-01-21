import express from 'express'
import mongoose from 'mongoose'
import { BlogModel } from '../Models/BlogModel.js';
import { UserModel } from '../Models/UserModel.js';
import cloudinary from '../Utils/Cloudinary.js';
import multer from 'multer';
import { upload } from '../Utils/Multer.js';


export const getAllBlogs = async(req,res)=>{
    try{
       const allblog = await BlogModel.find();
       if(!allblog) return res.status(401).json({message:'No blogs Available',success:false});
       return res.status(200).json({message:'All Blogs fetched Successfully',success:true,allblog});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in fetching all blogs',success:false,error});
    }
};

export const getBlogById = async(req,res)=>{
    try{
        const blogId = req.params.id;
        let findBlog = await BlogModel.findById(blogId).populate({path:'writtenBy',createdAt:-1,select:'-password'});
        
        if(!findBlog) return res.status(401).json({message:'This Blog does not exist',success:false});
        return res.status(200).json({messsage:'Blog fetched Successfully',success:true,findBlog});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in fetching blog',success:false,error});
    }
};

export const AddBlog = async(req,res)=>{
    try{
        const userId = req.id;
        const{title,category,description,content,tags} = req.body;
        if(!title || !category || !description || !content || !tags) return res.status(401).json({message:'Something is missing',success:false});
        
        // const {coverImage} = req.file;
        // if(!coverImage) return res.status(401).json({message:'Image is Required',success:false});
        if (!req.file) return res.status(401).json({message: "Image is required",success: false});       

        const cloudResponse = await cloudinary.uploader.upload(req.file.path, {folder:'Blog/images'});
        let newBlog = await BlogModel.create({title,category,description,content,tags,coverImage:cloudResponse.secure_url,writtenBy:userId});
        
        const author = await UserModel.findById(userId).select('-password');

        if(author){
            author.blogs.push(newBlog._id);
            await author.save();
        }
        await newBlog.populate({path:'writtenBy',createdAt:-1,select:'-password'});
        return res.status(200).json({message:'Blog added Successfully',success:true,newBlog});
    }
    catch(error){
        return res.status(401).json({message:'Error Occured in Adding new Blog',success:false,error});
    }
};
