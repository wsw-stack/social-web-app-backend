import express from 'express'
import { body, validationResult } from "express-validator";

import * as userController from '../controllers/userController';
import User from '../schemas/User';

const router = express.Router()

const validateUsername = [
    body("username")
      .trim()
      .notEmpty().withMessage("Username cannot be empty")
      .isLength({ max: 20 }).withMessage("Username cannot be empty and cannot be longer than 20 characters")
      .custom(async (username) => {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username already exists!");
        }
        return true;
      })
  ];

router.post("/register",[
    body("email").isEmail().withMessage("Please input valid email address"),
    body("username").notEmpty().isLength({max: 20}).withMessage("Username cannot be empty and cannot be longer than 20 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password length should be at least 6"),
], userController.register)

router.post('/login', userController.login)

router.get('/:id', userController.getUser)
router.put('/:id', 
    body("username").notEmpty().isLength({max: 20}).withMessage("Username cannot be empty"), 
    userController.updateUser)
router.post('/follow/:id', userController.followUser)
router.post('/unfollow/:id', userController.unfollowUser)

router.post('/logout', userController.logout)

export default router