import { DeepPartial } from "typeorm";
import { Booking } from "../entities/booking.entity";
import { AppDataSource } from "../utils/data-source";


const bookingRepository = AppDataSource.getRepository(Booking);

