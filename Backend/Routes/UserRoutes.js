import express from 'express'
import mongoose from 'mongoose'
import { Router } from 'express'
import { login, logout, register } from '../Controller/UserController.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(isAuthenticated,logout);

export default router;