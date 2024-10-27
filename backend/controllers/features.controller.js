import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import createMessage from "../utils/sms.js";
import fetch from 'node-fetch';

export const getNews = async(req,res,next)=>{
    const url = 'https://google-news13.p.rapidapi.com/search?keyword=crime%20against%20women%20in%20india&lr=en-US';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'google-news13.p.rapidapi.com'
        }
    };

    try{
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        res.status(200).json(result);
    }
    catch(err) {
        next(err);
    }
}

export const sendAlert = async (req,res,next) =>{
    const userId = req.user.id;
   
    try{
        const user = await User.findById(userId);
        const contacts = user.emergencyContacts;

        if(!user){
            return next(errorHandler(401 , "Unauthorized: You do not have access"));
        }
        createMessage();
        res.status(200).json("Message sent successfully");
    }
    catch(err){
        console.error(err);
        next(err);
    }
}

export const getTutorials = async(req,res,next)=>{
    const url = 'https://youtube-v31.p.rapidapi.com/search?q=Women%20safety%20tutorials%20and%20techniques&part=snippet%2Cid&regionCode=US&maxResults=50&order=date';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API_KEY,
            'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(200).json(result);
    } 
    catch(err) {
        next(err);
    }
}