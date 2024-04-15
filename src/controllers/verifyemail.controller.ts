import crypto from 'crypto';

import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from "express";
import config from 'config';
import AppError from "../utils/appError";
import { User } from "../entities/user.entity";
import { sendOTPHandller,verifyOTPhandler,verifyotp } from "./otp.controller";
import { findUser, findUserByReset, updateUser } from "../services/user.service";
import { OTPclass } from '../entities/otp.entity';
import { sendEmail } from '../utils/sendEmail';
import { ResetPasswordInput } from '../schemas/user.schema';

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
      throw next(new AppError(404, 'An email is required!'));
    }

    // Check if the user exists in the database
    const existingUser = await User.existsBy({email})   //find({where: email });
  
    console.log(existingUser)
    if (!existingUser) {
      throw next(new AppError(404, 'There is no account for the provided email.'));
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



// export const verifyotpviaemailhandler = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     console.log('in verify otp controller');
//     try {
//         //console.log(req.body);
//         const { email, otp } = req.body;
//         if (!(email && otp)) {
//             return next(new AppError(404, 'Empty OTP details are not allowed'));
//         } else {
//             const validOTP = await verifyotp(req, res, next); // Corrected
//             if (!validOTP) {
//                 return next(new AppError(404, 'Invalid code passed. Check your inbox.'));
//             }
//             // Fetch user from the database based on the email
//             const user = await User.findBy({ email });
            
//             //console.log(user);
//             if (!user) {
//                 return next(new AppError(404, 'User not found'));
//             }
//             const resetToken = crypto.randomBytes(32).toString('hex');
//             const passwordResetToken = crypto
//                 .createHash('sha256')
//                 .update(resetToken)
//                 .digest('hex');
//                 const userId = user[0].id;
//                 //console.log("This is user ID",userId)
//             const user1=await updateUser(
//                 { id:userId },
//                 {
//                     passwordResetToken,
//                     passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
//                 }
//             );

//             try {
//                 const url = `${config.get<string>('origin')}/resetPassword/${resetToken}`;
//                 const mailOptions = {
//                     from: process.env.AUTH_EMAIL,
//                     to: email,
//                     subject: 'Password Reset',
//                     text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${url}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
//                 };
//                 await sendEmail(mailOptions);

//                 res.status(200).json({
//                     status: 'success',
//                     message: 'Password reset email sent successfully.',
//                     resetToken,
//                     //user1
//                 });
//             } catch (err: any) {
//                 await updateUser(
//                     { id: userId },
//                     { passwordResetToken: null, passwordResetAt: null }
//                 );
//                 return res.status(500).json({
//                     status: 'error',
//                     message: 'There was an error sending email',
//                 });
//             }
//         }
//     } catch (error) {
//         next(error); // Handle errors that occur during the verification process
//     }
// };

export const verifyotpviaemailhandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('in verify otp controller');
    try {
        //console.log(req.body);
        const { email, otp } = req.body;
        if (!(email && otp)) {
            return next(new AppError(404, 'Empty OTP details are not allowed'));
        } else {
            const validOTP = await verifyotp(req, res, next); // Corrected
            if (!validOTP) {
                return next(new AppError(404, 'Invalid code passed. Check your inbox.'));
            }
            // Fetch user from the database based on the email
            const user = await User.findBy({ email });
            
            //console.log(user);
            if (!user) {
                return next(new AppError(404, 'User not found'));
            }
            const resetToken = crypto.randomBytes(32).toString('hex');
            const passwordResetToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');
            const userId = user[0].id;
            //console.log("This is user ID",userId)
            await updateUser(
                { id: userId },
                {
                    passwordResetToken,
                    passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
                }
            );

            res.status(200).json({
                status: 'success',
                message: 'Password reset token generated successfully.',
                resetToken,
            });
        }
    } catch (error) {
        next(error); // Handle errors that occur during the verification process
    }
};


export const resetPasswordHandler = async (
    req: Request<
      ResetPasswordInput['params'],
      //Record<string, never>,
      ResetPasswordInput['body']
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
       // console.log(req.body)
        //console.log(req.params)
      // Get the user from the collection
      //const userRepository = getRepository(User);
      const passwordResetToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');
// 
console.log(passwordResetToken)  
//const { resetToken } = req.params;
    const user = await findUserByReset(passwordResetToken);
  //console.log("user from resetpassword",user)
      if (!user) {
        // return res.status(403).json({
        //   status: 'fail',
        //   message: 'Invalid token or token has expired',
        // });
        return next(new AppError(403, 'Invalid token or token has expired'));
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      // Change password data
      user.password = hashedPassword;
      user.passwordResetToken = null;
      user.passwordResetAt = null;
      await User.save(user);
      const email = user.email; // Retrieve the user's email
      const url = `${config.get<string>('origin')}/login`; // URL to redirect after password reset
      const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: 'Password Reset Successfully',
          text: `Your password has been successfully updated.\n\nYou can now login using your new password.\n\nIf you did not initiate this action, please contact us immediately.\n`,
      };
      await sendEmail(mailOptions);

      //logout(res);
      res.status(200).json({
        status: 'success',
        message: 'Password data updated successfully',
      });
    } catch (err: any) {
      next(err);
    }
  };