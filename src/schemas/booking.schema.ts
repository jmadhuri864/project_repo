
import { TypeOf, date, object, string } from "zod";


export const BookingSchema = object({
    date: date(),
    time: string(),
    salonId: string(),
  serviceId: string(),
  barberId: string(),
  packageId: string().nullable(), // Assuming packageId is optional
});
//export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type BookingDTO = TypeOf<typeof BookingSchema>;