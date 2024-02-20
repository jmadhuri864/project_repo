import { Salon } from "../entities/salon.entity";
import { AppDataSource } from "../utils/data-source";

const salonRepository = AppDataSource.getRepository(Salon);

// export const createSalonData = async (input: Salon) => {
//   return salonRepository.save(salonRepository.create(input));
// };

export const createSalonData = async (input: Partial<Salon>) => {
    try {
      const newSalon = await salonRepository.save(input);
      return newSalon;
    } catch (error) {
      console.error('Error creating salon:', error);
      throw new Error('Failed to create salon');
    }
  };