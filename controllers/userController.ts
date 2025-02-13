import bcrypt from "bcrypt";
import { Request } from "express-validator/lib/base";

import User from "../schemas/User";
import { validationResult } from "express-validator";
import Session from "../schemas/Session";

const saltRounds = 10;

export const register = async (req: Request, res: any, next: any) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.errors[0].msg });
    }
    const { username, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ username: username });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error, please retry" });
    }
    if (existingUser) {
        return res
            .status(409)
            .json({ message: "A same username already exists!" });
    }
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (err) {
        return res.status(500).json({ message: "Password encryption failed" });
    }
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        introduction: "",
        followers: [],
        following: []
    });
    try {
        await newUser.save();
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error, please retry" });
    }
    res.status(201).json({
        message:
            "Registered successfully, please wait to be directed to the login page",
    });
};

export const login = async (req: any, res: any, next: any) => {
    const { username, password } = req.body;
    const existingUser: any = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(401).json({ message: "Wrong password or username" });
    } 
    const isMatch = await bcrypt.compare(password, existingUser.password)
    if(!isMatch) {
        return res.status(401).json({ message: "Wrong password or username" });
    }
    // successfully logged in
    req.session.user = existingUser.id
    req.session.save((err: any) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Login successfully, please wait to be directed to home page" });
    });
};

export const logout = async (req: any, res: any, next: any) => {
    try {
        await Session.deleteOne({})
    } catch {
        console.log('Something went wrong!')
    }
    res.json({success: 'successfully logged out'})
}

export const getUser = async (req: any, res: any, next: any) => {
    const {id} = req.params
    const user = await User.findById(id).populate({
        path: 'following',
        select: "username introduction"
    }).populate({
        path: 'followers',
        select: "username introduction",
    })
    
    res.json(user)
}

export const followUser = async (req: any, res: any, next: any) => {
    const {id} = req.params
    const { followerId } = req.body
    try {
        const user = await User.findById(id)
        const follower = await User.findById(followerId)
        user?.followers.push(followerId)
        follower?.following.push(id)
        await user?.save()
        await follower?.save()
        res.json({success: 'Successfully followed!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}

export const unfollowUser = async (req: any, res: any, next: any) => {
    const {id} = req.params
    const { followerId } = req.body
    try {
        const user = await User.findById(id)
        const follower = await User.findById(followerId)
        if(user && follower) {
            user.followers = user.followers.filter(userId => userId != followerId)
            follower.following = follower.following.filter(userId => userId != id)
        }
        else {
            res.json({error: 'either of the users cannot be found'})
        }
        await user?.save()
        await follower?.save()
        res.json({success: 'Successfully followed!'})
    } catch(err) {
        console.log(err)
        res.json({error: err})
    }
}
