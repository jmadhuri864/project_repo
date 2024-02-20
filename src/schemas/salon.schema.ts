import { object, string, array, nullable, number } from "zod";

// Define the schema for the Address entity
const AddressSchema = object({
    street: string(),
    city: string(),
});

// Define the schema for the Barber entity
const BarberSchema = object({
    name: string(),
    specialty: string(),
});

// Define the schema for the Service entity
const ServiceSchema = object({
    name: string(),
});

// Define the schema for the Package entity
const PackageSchema = object({
    name: string(),
    includedServices: array(ServiceSchema),
});

// Define the schema for the Review entity
const ReviewSchema = object({
    comment: string(),
    rating: number(), // Assuming rating is also a string, adjust if it's supposed to be a number
    likes: number(), // Similarly, assuming likes is a string
    stars: number(), // Assuming stars is a string
});

// Define the createSalonSchema
export const createSalonSchema = object({
    body: object({
        name: string(),
        contactno: string(),
        categories: array(string()).nullable(),
        addresses: array(AddressSchema),
        barbers: array(BarberSchema),
        services: array(ServiceSchema),
        packages: array(PackageSchema),
        reviews: array(ReviewSchema),
    }),
});

// Define the type for the CreateSalonSchema
export type CreateSalonSchema = {
    body: {
        name: string;
        contactno: string;
        categories: string[] | null;
        addresses: { street: string; city: string }[];
        barbers: { name: string; specialty: string }[];
        services: { name: string }[];
        packages: { name: string; includedServices: { name: string }[] }[];
        reviews: { comment: string; rating: number; likes: number; stars: number}[];
}
};
