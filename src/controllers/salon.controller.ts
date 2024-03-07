import { NextFunction,Request,Response } from "express";

import { createSalonData, getAllSalons, getSalonsByCategory} from "../services/salon.service";
import { CreateSalonSchema} from "../schemas/salon.schema";
import AppError from "../utils/appError";
import { Salon } from "../entities/salon.entity";
// import { GetCategorySchema, getCategorySchema } from "../schemas/category.schema";
// import { Salon } from "../entities/salon.entity";



export const createSalonHandler = async (
    req: Request<{}, {}, CreateSalonSchema>,
    res: Response,
    next: NextFunction
) => {
    try {
        const salonData= req.body;
        const image = req.body.image || 'default-barber.jpeg';
        salonData.image=image;
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

  // export const getSalonsByCategoryHandler = async (
  //   req: Request<{ category: string }, {}, {}, GetCategorySchema>, // Use the defined schema type
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     const { category } = req.params;
  // console.log(category);
  //     // Validate the request parameters using Zod schema
  //     const validatedParams = getCategorySchema.parse(req.params);
  //     console.log(validatedParams)
  
  //     // Call the service function to get salons by category
  //     const salons: Salon[] = await getSalonsByCategory(category);
  
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         salons,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error)
  //     next(error); // Pass any caught errors to the error handling middleware
  //   }
  // };


  export const getSalonsByCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
      const category: string = req.params.category; // Assuming category is passed as a parameter in the route
      
      console.log(Salon.isValidCategory(category))
      const salons = await getSalonsByCategory(category);

      const sanitizedSalons = salons.map(salon => {
        const { categories, ...sanitizedSalon } = salon;
        return sanitizedSalon;
      });
  
      res.status(200).json({salons: sanitizedSalons  });
    } catch (error) {
      res.status(400).json({error});
    }
  };