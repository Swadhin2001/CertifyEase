import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { User } from '../schema/user.model';
import { modifyPdf } from '../utils/generatePdf';


const signup: RequestHandlerParams = asyncHandler (async (req: Request, res: Response)=>{
    try {
        const {email,fileName,date,courseName } = req.body
        const userFind = await User.findOne({ email });
        if (userFind){
            return res.status(400).send("User Already Exists");
        }

        await modifyPdf(fileName,date,courseName, email)
        res.status(201).send('Certificate send successfully!');
    } 
    catch (error) {
        console.log (error);
        return res.status(400).send('Registration failed. Please try again');
    }
})

export {signup}