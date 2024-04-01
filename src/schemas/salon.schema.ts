import { object, string, array, nullable, number, TypeOf, boolean } from "zod";

// Define the schema for the Address entity
const AddressSchema = object({
    street: string(),
    city: string(),
});

// Define the schema for the Barber entity
const BarberSchema = object({
    first_name: string().nullable(),
    last_name:string().nullable(),
    image:string(),
    specialty: string(),
});

// Define the schema for the Service entity
const ServiceSchema = object({
    name: string(),
})

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

const GallerySchema=object({
    imageUrl: string()
})
// Define the createSalonSchema
export const createSalonSchema = object({
    body: object({
        name: string(),
        contactno: string(),
        bookmarked:boolean(),
        image:string(),
        categories: array(string()).nullable(),
        addresses: array(AddressSchema),
        barbers: array(BarberSchema),
        services: array(ServiceSchema),
        packages: array(PackageSchema),
        reviews: array(ReviewSchema),
        gallery:array(GallerySchema).optional()
    }),
});

export const SalonDTO = object({
    id:string(),
    bookmarked:boolean(),
    name: string(),
    image: string(),
    addresses: array(AddressSchema),
    star: ReviewSchema.pick({stars:true})
    //.shape({ stars: number() }).pick({ stars: true }),
});


export type SalonDTOType = TypeOf<typeof SalonDTO>;

export type CreateSalonSchema = TypeOf<typeof createSalonSchema>['body'];





