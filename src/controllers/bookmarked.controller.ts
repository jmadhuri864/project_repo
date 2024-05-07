import { NextFunction,Request,Response } from "express";
import { addBookmark, deleteBookmark, getAllBookmark } from "../services/bookmarked.service";
import AppError from "../utils/appError";
import { getSalonsbYBookmark } from "../services/salon.service";

export const AddBookmarkHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        //console.log(req.body);
        const {salonId}=req.params
         
        const bookmarked1=await addBookmark(salonId)
        
      
  
      res.status(200).json({
        status: 'success',
        data:bookmarked1
      });
    } catch (err) {
      next(err);
    }
  };
  

  export const deleteBookmarkHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        //console.log(req.body);
        console.log("in delete handler")
        const {salonId}=req.params
        console.log(salonId);
        const bookmarked1=await deleteBookmark(salonId)
        console.log("in the delete bookmark handler",bookmarked1)
      
  
      res.status(200).json({
        status: 'success',
        
        data:bookmarked1
      });
    } catch (err) {
      next(err);
    }
  };
  

  export const getAllBookmarkHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        console.log("in the add bookmark api");
        const allbookmark=await getSalonsbYBookmark()
        //console.log(allbookmark)
        if(!allbookmark){
          return next(new AppError(403, 'No bookmarks found'));
        }
        
      //console.log(allbookmark);
  
      res.status(200).json({
        status: 'success',
        data:allbookmark
      });
    } catch (err) {
      next(err);
    }
  };
  
  