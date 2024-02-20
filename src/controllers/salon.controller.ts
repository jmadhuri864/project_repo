import { NextFunction,Request,Response } from "express";

import { createSalonData } from "../services/salon.service";
import { CreateSalonSchema } from "../schemas/salon.schema";



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