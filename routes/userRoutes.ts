import express from 'express'
import { body, validationResult } from "express-validator";

import { register, login } from '../controllers/userController';

const router = express.Router()

router.post("/register",[
    body("email").isEmail().withMessage("Please input valid email address"),
    body("username").notEmpty().isLength({max: 20}).withMessage("Username cannot be empty"),
    body("password").isLength({ min: 6 }).withMessage("Password length should be at least 6"),
],register)

router.post('/login', login)

export default router