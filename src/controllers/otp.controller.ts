import { Request, Response, NextFunction } from "express";
import { OTPclass } from "../entities/otp.entity";
import { sendEmail } from "../utils/sendEmail";
import {hashData,verifyHashedData} from "../utils/hashData"
import { DeepPartial } from "typeorm";
import AppError from "../utils/appError";

export const requestForNewOTPHandller = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, subject, message, duration } = req.body;
        // Handle the request...

        const createdOtp = await sendOTPHandller({ email, subject, message, duration });
        res.status(200).json(createdOtp)
    } catch (err) {
        next(err);
    }
};

export const sendOTPHandller = async ({ email, subject, message, duration = 1 }:
     { email: string, subject: string, message: string, duration?: number }) => {
    try {
        //const { email, subject, message, duration = 1 } = req.body;
        if (!(email && subject && message)) {
            throw Error("Provide values for email, subject, and message");
        }
        // Clear any old records
        await OTPclass.delete({ email });
        // Generate OTP...
    const generateOTP=await generateOTPHandller();
//send email
const mailOptions={
from:process.env.AUTH_EMAIL,
to:email,
subject,
html:`<p>${message}</p><pstyle="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generateOTP}</b></p><p>This code <b> expires in ${duration} hour(s)</b>.</p>`

};
await sendEmail(mailOptions)

//save otp record
const hashedOTP=await hashData(generateOTP);
const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + duration);
// Save OTP record
const newOTP = await OTPclass.create({
    email,
    otp: hashedOTP,
    expiresAt: expirationTime
}as DeepPartial<OTPclass>);
await newOTP.save();

return newOTP;
   
    } catch (error) {
        throw error ;
    }
};


export const generateOTPHandller = async (): Promise<string> => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        return otp;
    } catch (err) {
        throw err; // Optionally handle or log the error here
    }
};

export const verifyotp=async( 
    req: Request,
    res: Response,
    next: NextFunction)=>{
        try {
            let { email, otp } = req.body;
            // Verify OTP
        const validOTP = await verifyOTPhandler(req, res, next);
return validOTP
        // Return the result to the client
        //res.status(200).json({ validOTP });
        }
        catch(err){
            next(err)
        }
    }

export const verifyOTPhandler = async( 
    req: Request,
    res: Response,
    next: NextFunction)=>{
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                return next(new AppError(400, 'Provide values for email and otp'));
                //throw Error("Provide values for email and otp");
            }
    
            // Ensure OTP record exists
           // const matchedOTPRecord = await OTPclass.findOne(where :{ email });
           const matchedOTPRecord = await OTPclass.findOne({ where: { email } });

            if (!matchedOTPRecord) {
                //throw Error("No OTP record found");
                return next(new AppError(404, 'No OTP record found'));
            }
    
            const expiresAt: Date = matchedOTPRecord.expiresAt; // Ensure expiresAt is a Date object
            if (expiresAt.getTime() < Date.now()) {
                await OTPclass.delete({ email });
                //throw Error("The OTP has expired. Request a new one.");
                return next(new AppError(400, 'The OTP has expired. Request a new one.'));
            }
    
            // Not expired yet, verify the OTP value
            const hashedOTP = matchedOTPRecord.otp;
            const validOTP = await verifyHashedData(otp, hashedOTP);
            return validOTP;
        } catch (err) {
            next(err); // Propagate the error to the error handling middleware
        }
    };


    export const deleteOTP = async(email:string):Promise<void>=>{
        try {
            await OTPclass.delete({email})
        } catch (error) {
            throw error
        }
    }