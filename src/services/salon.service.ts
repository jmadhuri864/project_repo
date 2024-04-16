import { Address } from "../entities/address.entity";
import { Barber } from "../entities/barber.entity";
import { Package } from "../entities/package.entity";
import { Review } from "../entities/review.entity";
import { Salon } from "../entities/salon.entity";
import { Service } from "../entities/service.entity";
import { CreateSalonSchema, SalonDTOType } from "../schemas/salon.schema";
import { AppDataSource } from "../utils/data-source";
import { VALID_CATEGORIES } from '../entities/salon.entity';
import { Gallery } from "../entities/gallery.entity";

import { WorkingHours } from "../entities/workinghours.entity";
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
  salon.bookmarked=input.bookmarked;
  salon.contactno = input.contactno;
  salon.image=input.image;
  salon.description=input.description;
  salon.categories = categories;
  salon.addresses = [];
  salon.barbers = [];
  salon.services = [];
  salon.packages = [];
  salon.reviews = [];
  salon.gallery=[];
  
  salon.workingHours=[];

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

  
  // Save gallery images
  for (const galleryData of input.gallery??[]) {
    const gallery = new Gallery();
    gallery.imageUrl = galleryData.imageUrl??'';
    await salonRepository.manager.save(gallery);
    salon.gallery.push(gallery);
  }

    for (const WorkingHoursData of input.workingHours ?? []) {
    
    const workingHours = new WorkingHours();
    workingHours.startDay=WorkingHoursData.startDay;
    workingHours.endDay=WorkingHoursData.endDay;
    // workingHours.openingTime=WorkingHoursData.openingTime;
    // workingHours.closingTime=WorkingHoursData.closingTime;
     // Convert string to Date for openingTime and closingTime
     workingHours.openingTime = parseTimeStringToDateTime(WorkingHoursData.openingTime);
     workingHours.closingTime = parseTimeStringToDateTime(WorkingHoursData.closingTime);
    await salonRepository.manager.save(workingHours);
    salon.workingHours.push(workingHours);
  }
  return await salonRepository.save(salon);
};

// export const getAllSalons = async (): Promise<Salon[]> => {
//     //const salonRepository = getRepository(Salon);
//     const salons =await salonRepository.find({ 
//       relations: ['addresses', 'barbers', 'packages', 'reviews', 'services'] 
//   });
//   const salonsDTO: SalonDTOType[] = salons.map((salon: any) => ({
//     name: salon.body.name,
//     image: salon.body.image,
//     addresses: salon.body.addresses,
//     star: salon.body.reviews.map((review: any) => ({ stars: review.stars })),
// }));
// return salonsDTO;
     
// };

export const getAllSalons = async (): Promise<SalonDTOType[]> => {
  //const salonRepository = getRepository(Salon); // Get the repository for Salon entity
  const salons = await salonRepository.find({ 
      relations: ['addresses', 'barbers', 'packages', 'reviews', 'services'] 
  });

  // Transform each Salon entity to SalonDTOType
  const salonsDTO: SalonDTOType[] = salons.map((salon: Salon) => {
      // Find the maximum number of stars among all reviews
      const maxStars = Math.max(...salon.reviews.map(review => review.stars));

      return {
        id:salon.id,
          name: salon.name,
          image: salon.image,
          addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
          star: { stars: maxStars },
          bookmarked:salon.bookmarked // Send the maximum number of stars as an array with a single object
      };
  });

  return salonsDTO;
};

// export const getSalonsByCategory = async (category: string): Promise<SalonDTOType[]> => {
//   //const salonRepository = getRepository(Salon);

//   let salons: SalonDTOType[];

//   if (category === 'All') {
//     // If category is 'All', fetch all salons
//     console.log("all strating")
//     const salonsEntities = await salonRepository.find({ relations: ['addresses'] });
//     console.log("this is for all");

//     salons = salonsEntities.map((salon: Salon) => ({
//       name: salon.name,
//       image: salon.image,
//       addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
//       star: { stars: Math.max(...salon.reviews.map(review => review.stars)) }
//   }));
//   } else if (Salon.isValidCategory(category)) {
//     console.log("hello")
//     // Filter salons based on the specified category
//     const salonsEntities = await salonRepository.createQueryBuilder('salon')
//     .leftJoinAndSelect('salon.addresses', 'address')
//       .where('LOWER(salon.categories) LIKE LOWER(:category)', { category: `%${category}%` })
//       .getMany();
// //console.log("for valid category",salonsEntities)
//       salons = salonsEntities.map((salon: Salon) => ({
//         name: salon.name,
//         image: salon.image,
//         addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
//         star: { stars: Math.max(...salon.reviews.map(review => review.stars)) }
//     }));
//   } else {
//     // Invalid category provided
//     throw new Error("Invalid category");
//   }
// console.log("category ",salons)
//   return salons;
// };


export const getSalonsByCategory = async (category: string): Promise<SalonDTOType[]> => {
  try {
    let salons: SalonDTOType[];

    if (category === 'All') {
      // If category is 'All', fetch all salons
      console.log("Fetching all salons...");
      const salonsEntities = await salonRepository.find({ relations: ['addresses', 'reviews'] });
      console.log("Fetched all salons:", salonsEntities);

      salons = salonsEntities.map((salon: Salon) => ({
        id:salon.id,
        name: salon.name,
        image: salon.image,
        addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
        star: { stars: Math.max(...salon.reviews.map(review => review.stars)) },
        bookmarked:salon.bookmarked
      }));
    } else if (Salon.isValidCategory(category)) {
      console.log("Fetching salons for category:", category);
      // Filter salons based on the specified category
      const salonsEntities = await salonRepository.createQueryBuilder('salon')
        .leftJoinAndSelect('salon.addresses', 'address')
        .leftJoinAndSelect('salon.reviews', 'review')
        .where('LOWER(salon.categories) LIKE LOWER(:category)', { category: `%${category}%` })
        .getMany();

      console.log("Fetched salons for category:", salonsEntities);
      salons = salonsEntities.map((salon: Salon) => ({
        id:salon.id,
        name: salon.name,
        image: salon.image,
        addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
        star: { stars: Math.max(...salon.reviews.map(review => review.stars)) },
        bookmarked:salon.bookmarked
      }));
    } else {
      // Invalid category provided
      throw new Error("Invalid category");
    }

    //console.log("Returning salons:", salons);
    return salons;
  } catch (error) {
    //console.error("Error in getSalonsByCategory:", error);
    throw error; // Rethrow the error to be caught by the controller
  }
};

export const getSalonsByName = async (name: string): Promise<SalonDTOType[]> => {
  try {
    let salons: Salon[];
    //console.log("starting");

    // Assuming you have a repository named salonRepository
    salons = await salonRepository.createQueryBuilder('salon')
      .leftJoinAndSelect('salon.addresses', 'address')
      .where('LOWER(salon.name) LIKE LOWER(:startsWith)', { startsWith: `${name}%` }) // Name starts with provided string
      .orWhere('LOWER(salon.name) LIKE LOWER(:endsWith)', { endsWith: `%${name}` }) // Name ends with provided string
      .orWhere('LOWER(salon.name) LIKE LOWER(:contains)', { contains: `%${name}%` }) // Name contains provided string
      .getMany();

    //console.log("after query");
    const salonDTOs: SalonDTOType[] = salons.map((salon: Salon) => ({
      id:salon.id,
      name: salon.name,
      image: salon.image,
      addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
      star: { stars: salon.reviews ? Math.max(...salon.reviews.map(review => review.stars)) : 0 },
      bookmarked:salon.bookmarked
    }));
    //console.log("before return");

    //console.log(salonDTOs);
    return salonDTOs;
  } catch (error) {
    console.error("Error in getSalonsByName:", error);
    throw error;
  }
};


export const getSalonsbYBookmark = async (): Promise<SalonDTOType[]> => {
  //const salonRepository = getRepository(Salon); // Get the repository for Salon entity
  const salons = await salonRepository.find({ 
      relations: ['addresses', 'barbers', 'packages', 'reviews', 'services'],
      where: { bookmarked: true } // Filter salons where bookmarked is true
  });
console.log(salons);
  // Transform each Salon entity to SalonDTOType
  const salonsDTO: SalonDTOType[] = salons.map((salon: Salon) => {
      // Find the maximum number of stars among all reviews
      const maxStars = Math.max(...salon.reviews.map(review => review.stars));

      return {
        id:salon.id,
          name: salon.name,
          image: salon.image,
          addresses: salon.addresses.map(address => ({ street: address.street, city: address.city })),
          star: { stars: maxStars }, // Send the maximum number of stars as an array with a single object
          bookmarked:salon.bookmarked
      };
  });

  return salonsDTO;
};



export const getsalondetailsById = async (salonId: string): Promise<any> => {
  try {
    //const salonRepository = getRepository(Salon);

    // Fetch salon details with related entities
    const salon = await salonRepository
      .createQueryBuilder('salon')
      .leftJoinAndSelect('salon.addresses', 'addresses')
      .leftJoinAndSelect('salon.barbers', 'barbers')
      .leftJoinAndSelect('salon.reviews', 'reviews')
      .where('salon.id = :id', { id: salonId })
      .getOneOrFail();

    // Construct response object
    const salonDetails = {
      name: salon.name,
      address: salon.addresses.map(address => ({
        street: address.street,
        city: address.city,
      })),
      rating: calculateAverageRating(salon.reviews),
      barbers: salon.barbers.map(barber => ({
        name: `${barber.first_name} ${barber.last_name}`,
        photo: barber.image,
        specialty: barber.specialty,
      })),
    };

    return salonDetails;
  } catch (error) {
    console.error(error);
    
    throw new Error('Failed to fetch salon details');
  }
};


function parseTimeStringToDateTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date;
}

function calculateAverageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
}

export const findsalonById = async (salonId: string) => {
  return await salonRepository.findOneBy({ id: salonId });
};


export const findSalonAboutus = async (salonId: string) => {
  try {
    const salon = await salonRepository
      .createQueryBuilder('salon')
      .leftJoinAndSelect('salon.addresses', 'addresses')
      .leftJoinAndSelect('salon.workingHours', 'workingHours')
      .where('salon.id = :id', { id: salonId })
      .getOneOrFail();

    // Extract relevant details
    const salonDetails: any = {
      name: salon.name,
      description: salon.description, // Assuming description is a property of the Salon entity
      contactno: salon.contactno,
      address: [],
      workingHours: [],
    };

    if (salon.addresses) {
      salonDetails.address = salon.addresses.map((address: Address) => ({
        street: address.street,
        city: address.city,
      }));
    }

    if (salon.workingHours) {
      salonDetails.workingHours = salon.workingHours.map((hours: WorkingHours) => ({
        startDay: hours.startDay,
        endDay: hours.endDay,
        openingTime: hours.openingTime,
        closingTime: hours.closingTime,
      }));
    }

    return salonDetails;
  } catch (error) {
    console.error('Error fetching salon details:', error);
    throw new Error('Error fetching salon details');
  }
};


export const findSalonServices = async (salonId: string) => {
  try {
    const salon = await salonRepository
      .createQueryBuilder('salon')
      .leftJoinAndSelect('salon.services', 'service')
      .where('salon.id = :id', { id: salonId })
      .getOneOrFail();

    const salonServices = salon.services.map((service: Service) => ({
      name: service.name,
      // Add other properties of the service you want to include here
    }));

    return salonServices;
  } catch (error) {
    console.error('Error fetching salon services:', error);
    throw new Error('Error fetching salon services');
  }
};

//findSalonGallery(salonId)

export const findSalonGallery = async (salonId: string) => {
  try {
    const salon = await salonRepository
      .createQueryBuilder('salon')
      .leftJoinAndSelect('salon.gallery', 'gallery')
      .where('salon.id = :id', { id: salonId })
      .getOneOrFail();

    const gallaryservice = salon.gallery?.map((gallery: Gallery) => ({
      url: gallery.imageUrl,
      // Add other properties of the service you want to include here
    }));

    return gallaryservice;
  } catch (error) {
    console.error('Error fetching salon services:', error);
    throw new Error('Error fetching salon services');
  }
};


export const getSalonPackagesService = async (salonId: string) => {
  try {
    const salon = await salonRepository
      .createQueryBuilder('salon')
      .leftJoinAndSelect('salon.packages', 'packages') // Corrected to 'packages' instead of 'salon.packages'
      .where('salon.id = :id', { id: salonId })
      .getOneOrFail();

    const packageServices = salon.packages.map((packages) => ({
      name: packages.name,
      // You can include other properties of the package here if needed
    }));

    return packageServices;
  } catch (err) {
    throw new Error('Error fetching salon packages'); // Improved error message
  }
};