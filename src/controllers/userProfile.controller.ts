import { NextFunction,Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { CreateProfileSchema } from '../schemas/userProfile.schema';
import { findUserByEmail} from '../services/user.service';
import { createProfile, getprofile } from '../services/userProfile.service';



export const userProfileCreateHandler = async (
  req: Request<{}, {}, CreateProfileSchema>,
  res: Response,
  next: NextFunction
) => {
  try {

    const user = await findUserByEmail({ email: req.body.email });

    //const user = await findUserByEmail(req.body.email as string);
    const image = req.body.image || 'default.jpeg';
    const post = await createProfile({ ...req.body, image }, user!);

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'user profile not created',
      });
    }
    next(err);
  }
};

export const getprofileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   const email=res.locals.user.email;

   const userprofile = await getprofile(email);
   const user = res.locals.user;
    //const name=res.locals.userProfile.nickname;
    console.log(userprofile)

    res.status(200).status(200).json({
      status: 'success',
      data: {
        userprofile,
       //user
        //name
        //userName
      
      },
    });
  } catch (err) {
    next(err);
  }
};


