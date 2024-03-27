import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { User } from "../entities/user.entity";
import { sendOTPHandller,verifyOTPhandler,verifyotp } from "./otp.controller";

export const verifyemailhandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    const { email } = req.body;
    console.log(email);
    if (!email) {
      return next(new AppError(404, 'An email is required!'));
    }

    // Check if the user exists in the database
    const existingUser = await User.findBy({ email });
    console.log(existingUser)
    if (!existingUser) {
      return next(new AppError(404, 'There is no account for the provided email.'));
    }

    // Send OTP for email verification
    const otpDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with the code below.",
      duration: 1,
    };
    const otpResult = await sendOTPHandller(otpDetails);

    // Respond to the client with the result
    res.status(200).json(otpResult);
  } catch (err) {
    next(err);
  }
};


export const verifyotpviaemailhandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("in verfify otp controller")
    try {
        console.log(req.body)
        const { email, otp } = req.body;
        if (!(email && otp)) {
            return next(new AppError(404, 'Empty OTP details are not allowed'));
        } else {
            const validOTP = await verifyotp(req, res, next); // Corrected
            if (!validOTP) {
                return next(new AppError(404, 'Invalid code passed. Check your inbox.'));
            }
            res.status(200).json({email});
        }
    } catch (error) {
        next(error); // Handle errors that occur during the verification process
    }
};
