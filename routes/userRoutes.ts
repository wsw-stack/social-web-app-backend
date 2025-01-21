import express from 'express'
import { body, validationResult } from "express-validator";

import * as userController from '../controllers/userController';

const router = express.Router()

router.post("/register",[
    body("email").isEmail().withMessage("Please input valid email address"),
    body("username").notEmpty().isLength({max: 20}).withMessage("Username cannot be empty"),
    body("password").isLength({ min: 6 }).withMessage("Password length should be at least 6"),
], userController.register)

router.post('/login', userController.login)

router.get('/:id', userController.getUser)

router.post('/logout', userController.logout)

export default router