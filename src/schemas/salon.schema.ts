import { TypeOf, array, number, object, string, z } from "zod";

const AddressSchema = object({
    street: string(),
    city: string()
});

const BarberSchema = object({
    name: string(),
    specialty: string()
});

const ServiceSchema = object({
    name:string()
});

const PackageSchema = object({
    name: string(),
    includedServices: array(ServiceSchema)
});

const ReviewSchema = object({
    comment: string(),
    rating: number(),
    likes: number(),
    stars: number()
});

export const createSalonSchema = object({
   body:object({
     name: string(),
    contactno: z.string(),
    categories: z.array(z.string()).nullable(),
    addresses: z.array(AddressSchema),
    barbers: z.array(BarberSchema),
    services: z.array(ServiceSchema),
    packages: z.array(PackageSchema),
    reviews: z.array(ReviewSchema)
   })
});




export type CreateSalonSchema = TypeOf<typeof createSalonSchema>['body'];
