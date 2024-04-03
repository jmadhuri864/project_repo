import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";
import { Booking } from "./booking.entity";

@Entity("services")
export class Service extends Model 
{
  @Column()
  name: string;

  @ManyToOne(() => Salon, (salon) => salon.services)
  salon: Salon;

  @OneToMany(() => Booking, booking => booking.service)
  bookings: Booking[];
}
