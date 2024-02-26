import { TypeOf, object, string } from "zod";

// const params={
//   params:object({
//     category:string()
//   })
// }
export const getCategorySchema = object({
  params: object({
    category: string().min(1).refine(value => ["Haircuts", "Makeup", "Manicure", "Massage", "All"].includes(value), {
      message: 'Category must be one of: Haircuts, Makeup, Manicure, Massage, All'
    })
  })
});

export type GetCategorySchema = TypeOf<typeof getCategorySchema>['params'];