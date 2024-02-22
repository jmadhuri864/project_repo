import { Salon } from "../entities/salon.entity";
import { CreateSalonSchema } from "../schemas/salon.schema";
import { AppDataSource } from "../utils/data-source";

const salonRepository = AppDataSource.getRepository(Salon);

// export const createSalonData = async (input: Salon) => {
//   return salonRepository.save(salonRepository.create(input));
// };

export const createSalonData = async (input:any): Promise<Salon> => {
    //const salonRepository = getRepository(Salon);
    const salon = new Salon();
    salon.name = input.name;
    salon.contactno = input.contactno;
    salon.categories = input.categories;
    // Add addresses, barbers, services, packages, and reviews based on input data
    salon.addresses = input.addresses;
    salon.barbers = input.barbers;
    salon.services = input.services;
    salon.packages = input.packages;
    salon.reviews = input.reviews;
    return await salonRepository.save(salon);
};

export const getAllSalons = async (): Promise<Salon[]> => {
    //const salonRepository = getRepository(Salon);
    return await salonRepository.find();
};


const VALID_CATEGORIES = ["Haircuts", "Makeup", "Manicure", "Massage", "All"];

export const getSalonsByCategory = async (category: string): Promise<Salon[]> => {
    let query = salonRepository.createQueryBuilder("salon");
  
    // Filter salons based on the specified category
    if (!VALID_CATEGORIES.includes(category)) {
      throw new Error("Invalid category");
    }
  
    if (category !== "All") {
      query = query.where(":category = ANY(salon.categories)", { category });
    }
  
    return await query.getMany();
};