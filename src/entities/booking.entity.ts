import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";
import { Service } from "./service.entity";



@Entity()
export class Booking extends Model {


  @Column()
  date: Date;

  @ManyToOne(() => Salon, salon => salon.bookings)
  salon: Salon;

  @ManyToOne(() => Service, service => service.bookings)
  service: Service;
}