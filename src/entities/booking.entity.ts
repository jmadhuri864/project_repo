import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";
import { Service } from "./service.entity";
import { Barber } from "./barber.entity";




@Entity("bookings")
export class Booking extends Model
 
{
 @Column()
  date: Date;

  @ManyToOne(() => Salon, salon => salon.bookings)
  salon: Salon;

  @ManyToOne(() => Service, service => service.bookings)
  service: Service;

  @ManyToOne(()=>Barber,barber=>barber.bookings)
  barber:Barber;

  //@ManyToOne(()=>Package,package=>package.)


}