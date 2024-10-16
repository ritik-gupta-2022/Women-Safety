import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import createMessage from "../utils/sms.js";
import fetch from 'node-fetch';

export const getNews = async(req,res,next)=>{
    const url = 'https://google-news13.p.rapidapi.com/search?keyword=crime%20against%20women%20in%20india&lr=en-US';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7f8dcc7f04msh923f6f64622561ap1dd1e1jsn39f058161bbe',
            'x-rapidapi-host': 'google-news13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        res.status(200).json("News Recieved");
    }
    catch (error) {
        next(error);
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
