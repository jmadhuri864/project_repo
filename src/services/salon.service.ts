import { Address } from "../entities/address.entity";
import { Barber } from "../entities/barber.entity";
import { Package } from "../entities/package.entity";
import { Review } from "../entities/review.entity";
import { Salon } from "../entities/salon.entity";
import { Service } from "../entities/service.entity";
import { CreateSalonSchema } from "../schemas/salon.schema";
import { AppDataSource } from "../utils/data-source";
import { VALID_CATEGORIES } from '../entities/salon.entity';
const salonRepository = AppDataSource.getRepository(Salon);

// export const createSalonData = async (input: Salon) => {
//   return salonRepository.save(salonRepository.create(input));
// };

export const createSalonData = async (input: CreateSalonSchema): Promise<Salon> => {
  //const salonRepository = getRepository(Salon);
  const categories = input.categories ?? [];
  // Create a new Salon instance
  const salon = new Salon();
  salon.name = input.name;
  salon.contactno = input.contactno;
  salon.image=input.image;
  salon.categories = categories;
  salon.addresses = [];
  salon.barbers = [];
  salon.services = [];
  salon.packages = [];
  salon.reviews = [];

  // Loop through and save each address, barber, service, package, and review
  for (const addressData of input.addresses) {
      const address = new Address();
      address.street = addressData.street;
      address.city = addressData.city;
      await salonRepository.manager.save(address);
      salon.addresses.push(address);
  }

  for (const barberData of input.barbers) {
      const barber = new Barber();
      barber.first_name = barberData.first_name ?? '';
      barber.last_name = barberData.last_name ?? '';
      barber.image=barberData.image;
      barber.specialty = barberData.specialty;
      await salonRepository.manager.save(barber);
      salon.barbers.push(barber);
  }

  for (const serviceData of input.services) {
      const service = new Service();
      service.name = serviceData.name;
      await salonRepository.manager.save(service);
      salon.services.push(service);
  }

  for (const packageData of input.packages) {
      const package1 = new Package();
      package1.name = packageData.name;

      // Assuming includedServices is an array of Service entities, you need to save each service and then assign them to the package
      const includedServices = [];
      for (const includedServiceData of packageData.includedServices) {
          const service = new Service();
          service.name = includedServiceData.name;
          await salonRepository.manager.save(service);
          includedServices.push(service);
      }
      package1.includedServices = includedServices;

      await salonRepository.manager.save(package1);
      salon.packages.push(package1);
  }

  for (const reviewData of input.reviews) {
      const review = new Review();
      review.comment = reviewData.comment;
      review.rating = reviewData.rating;
      review.likes = reviewData.likes;
      review.stars = reviewData.stars;
      await salonRepository.manager.save(review);
      salon.reviews.push(review);
  }

  // Save the Salon entity
  return await salonRepository.save(salon);
};

export const getAllSalons = async (): Promise<Salon[]> => {
    //const salonRepository = getRepository(Salon);
    return await salonRepository.find({ 
      relations: ['addresses', 'barbers', 'packages', 'reviews', 'services'] 
  });
    
};


export const getSalonsByCategory = async (category: string): Promise<Salon[]> => {
  //const salonRepository = getRepository(Salon);

  let salons: Salon[];

  if (category === 'All') {
    // If category is 'All', fetch all salons
    salons = await salonRepository.find({ relations: ['addresses'] });
  } else if (Salon.isValidCategory(category)) {
    // Filter salons based on the specified category
    salons = await salonRepository.createQueryBuilder('salon')
    .leftJoinAndSelect('salon.addresses', 'address')
      .where('LOWER(salon.categories) LIKE LOWER(:category)', { category: `%${category}%` })
      .getMany();
  } else {
    // Invalid category provided
    throw new Error("Invalid category");
  }

  return salons;
};

export const getSalonsByName = async (name: string): Promise<any[]> => {
  let salons: Salon[];

  // Assuming you have a repository named salonRepository
  salons = await salonRepository.createQueryBuilder('salon')
  .leftJoinAndSelect('salon.addresses', 'address')
    .where('LOWER(salon.name) LIKE LOWER(:startsWith)', { startsWith: `${name}%` }) // Name starts with provided string
    .orWhere('LOWER(salon.name) LIKE LOWER(:endsWith)', { endsWith: `%${name}` }) // Name ends with provided string
    .orWhere('LOWER(salon.name) LIKE LOWER(:contains)', { contains: `%${name}%` }) // Name contains provided string
    .getMany();

  return salons;
};