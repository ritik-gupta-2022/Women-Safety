import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const userSignUp = async(req,res,next)=>{
    const {username, name , password, email, phoneNo, address} = req.body;

    if(!username|| !name || !email || !password || !email || !phoneNo || !address || username === '' || name==='' || email === '' || password === '' || address==='' || phoneNo===''){
        next(errorHandler(400, 'All fields are required'));
    }
    const hashedPass = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        name,
        email,
        phoneNo,
        address,
        password:hashedPass,
    })

    try{
        await newUser.save();
        res.status(201).json({ message: "Sign-Up Successful" });
    }
    catch(err){
        next(err);
    }
}

export const userSignin = async(req,res,next)=>{
    const {username, password} = req.body;

    if(!username || !password || username === ''|| password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try{
        const user  = await User.findOne({username});

        if(!user){
            return next(errorHandler(404, 'User not found'));
        } 

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return next(errorHandler(400, 'Invalid password'));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY,);

         // { ...rest } collects the remaining properties of the validUser._doc object (excluding password) into a new object called rest. because we do't want to send password in our response object
        const { password :pass, ...rest} = user._doc

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        })
        .json(rest);
        
    }
    catch(err){
        next(err);
    }
}