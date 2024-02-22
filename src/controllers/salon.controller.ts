import { NextFunction,Request,Response } from "express";

import { createSalonData, getAllSalons, getSalonsByCategory } from "../services/salon.service";
import { CreateSalonSchema} from "../schemas/salon.schema";
import AppError from "../utils/appError";
import { GetCategorySchema } from "../schemas/category.schema";



export const createSalonHandler = async (
    req: Request<{}, {}, CreateSalonSchema>,
    res: Response,
    next: NextFunction
) => {
    try {
        const salonData= req.body;
        
        // Create a new salon using the service function
        const newSalon = await createSalonData(salonData);

        // Send a success response
        res.status(201).json({ message: 'Salon created successfully' ,salon: newSalon });
    } catch (error) {
        console.error('Error creating salon:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getAllSalonhandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
    const salons = await getAllSalons();
  
    //   if (!salons) {
    //     return next(new AppError(404, 'Salons'));
    //   }
  
      res.status(200).json({
        status: 'success',
        data: {
          salons,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };

  export const getSalonsByCategoryHandler = async (
    req: Request<{ category: string }, {}, {}, GetCategorySchema>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Validate request parameters
      const {category}  = req.params;
  
    //   // If validation fails, handle the error
    //   if (!category.success) {
    //     throw new Error(category.error.message);
    //   }
  
      // Assuming category is passed as a URL parameter
      const salons = await getSalonsByCategory(category);
  
      res.status(200).json({
        status: 'success',
        data: {
          salons,
        },
      });
    } catch (error) {
      next(error);
    }
  };