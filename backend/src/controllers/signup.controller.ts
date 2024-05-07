import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { User } from '../schema/user.model';
import { sendOTP } from '../utils/nodemailerConfig';
// import randomstring from 'randomstring'


// const otp = "123456";

const signup: RequestHandlerParams = asyncHandler ((req: Request, res: Response)=>{
    try {
        const {email, certificateLink} = req.body
        sendOTP(email, certificateLink);
        const user = new User({ email, certificateLink});
        user.save();
        res.status(201).send('Certificate send successfully!');


        // bcrypt.genSalt(saltRounds, function(err, salt) {
        //     if (err) 
        //         console.log ("gensalt Error: ", err);

        //     bcrypt.hash(pass, salt,async function(err, hash) {
        //         if (err) {
        //             console.log ("hash Error: ", err);
        //             return;
        //         }
                
        //     });
        // });
    } 
    catch (error) {
        console.log (error);
        return res.status(400).send('Registration failed. Please try again');
    }
})

export {signup}