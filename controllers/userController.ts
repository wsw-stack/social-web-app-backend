import bcrypt from "bcrypt";
import { Request } from "express-validator/lib/base";

import User from "../schemas/User";
import { validationResult } from "express-validator";

const saltRounds = 10;

export const register = async (req: Request, res: any, next: any) => {
    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.errors[0].msg)
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
    console.log(req.session)
    req.session.save((err: any) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: "Login successfully, please wait to be directed to home page" });
    });
};

export const getUser = async (req: any, res: any, next: any) => {
    const {id} = req.params
    const user = await User.findById(id)
    res.json(user)
}
