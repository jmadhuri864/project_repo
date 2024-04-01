import { DeepPartial} from "typeorm";

import { AppDataSource } from "../utils/data-source";
import { Salon } from "../entities/salon.entity";
import { SalonDTOType } from "../schemas/salon.schema";


const salonRepository = AppDataSource.getRepository(Salon); 



export const addBookmark = async (salonId: string) => {
    const salon = await salonRepository.findOne({ where: { id: salonId },
        relations: ['addresses', 'barbers', 'packages', 'reviews', 'services']  });
    if (salon) {
        salon.bookmarked = true;
        await salonRepository.save(salon);
        
        // Map Salon entity to SalonDTOType
        //const maxStars = salon.reviews.length > 0 ? Math.max(...salon.reviews.map(review => review.stars)) : 0;
        const maxStars = salon.reviews && salon.reviews.length > 0 ? Math.max(...salon.reviews.map(review => review.stars)) : 0;

        const salonDTO: SalonDTOType = {
            id: salon.id,
            name: salon.name,
            image: salon.image,
            addresses: salon.addresses ?salon.addresses.map(address => ({ street: address.street, city: address.city })):[],
            star: { stars: maxStars },
            bookmarked:salon.bookmarked // Send the maximum number of stars as an array with a single object
        };
        
        return salonDTO;
    }
    return null; // Salon not found
}

export const getAllBookmark = async () => {
    return await salonRepository.find({ where: { bookmarked: true } });
}


export const deleteBookmark = async (salonId: string) => {
    const salon = await salonRepository.findOne({ where: { id: salonId },
        relations: ['addresses', 'barbers', 'packages', 'reviews', 'services']  });
    if (salon) {
        salon.bookmarked = false;
        await salonRepository.save(salon);
        
        // Map Salon entity to SalonDTOType
        //const maxStars = salon.reviews.length > 0 ? Math.max(...salon.reviews.map(review => review.stars)) : 0;
        const maxStars = salon.reviews && salon.reviews.length > 0 ? Math.max(...salon.reviews.map(review => review.stars)) : 0;

        const salonDTO: SalonDTOType = {
            id: salon.id,
            name: salon.name,
            image: salon.image,
            addresses: salon.addresses ?salon.addresses.map(address => ({ street: address.street, city: address.city })):[],
            star: { stars: maxStars },
            bookmarked:salon.bookmarked // Send the maximum number of stars as an array with a single object
        };
        
        return salonDTO;
    }
    return null; // Salon not found
}

