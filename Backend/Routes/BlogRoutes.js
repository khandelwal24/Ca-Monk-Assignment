import express from 'express'
import mongoose from 'mongoose'
import { Router } from 'express'
import { AddBlog, getAllBlogs, getBlogById } from '../Controller/BlogController.js';
import { isAuthenticated } from '../Middlewares/Auth.js';
import { upload } from '../Utils/Multer.js';

const router = express.Router();

router.route('/blogs').get(isAuthenticated,getAllBlogs);
router.route('/blog/:id').get(isAuthenticated,getBlogById);
router.route('/blogs').post(isAuthenticated,upload.single('coverImage'),AddBlog);

export default router;