import { NextFunction, Request, Response } from 'express';
import { getUserProfileByNickname, getprofile } from '../services/userProfile.service';


export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   const email=res.locals.user.email;
   //console.log(email)
   //console.log("hellllooo")
   const userprofile = await getprofile(email);
   //console.log(userprofile)
   const user = res.locals.user;

    const name=userprofile?.nickname
   console.log(name)

    res.status(200).json({
      status: 'success',
      data: {
        //userprofile,
        //user,
        email,
        name
      
      },
    });
  } catch (err) {
    next(err);
  }
};


