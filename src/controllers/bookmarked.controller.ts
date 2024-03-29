import { NextFunction,Request,Response } from "express";
import { addBookmark } from "../services/bookmarked.service";
import AppError from "../utils/appError";

export const AddBookmarkHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        console.log(req.body);
        
        //const a =req.body
        const { salonId, bookmarked } = req.body;
        const user = res.locals.user;
        console.log(user.id);
        const userId=user.id;
        const bookmarked1=await addBookmark({ salonId, bookmarked })
        if(!bookmarked1)
        return next(new AppError(403, "bookmared is not found"))
      
  
      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      next(err);
    }
  };
  
  