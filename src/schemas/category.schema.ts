import { TypeOf, object, string } from "zod";

// Define the schema for the category parameter
export const getCategorySchema = object({
    params: object({
      category: string().min(1).refine(value => ["Haircuts", "Makeup", "Manicure", "Massage", "All"].includes(value), {
        message: 'Category must be one of: Haircuts, Makeup, Manicure, Massage, All'
      })
    })
  });
  
  // Define the type for the category parameter
  export type GetCategorySchema = TypeOf<typeof getCategorySchema>['params'];