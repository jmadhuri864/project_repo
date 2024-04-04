import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Service } from "./service.entity";
import { Salon } from "./salon.entity";
import { Booking } from "./booking.entity";

@Entity("packages")
export class Package extends Model
 {
  @Column()
  name: string;

  @ManyToMany(() => Service)
  @JoinTable()
  includedServices: Service[];
  
  @OneToMany(() => Booking, booking => booking.package)
  bookings: Booking[];

  @ManyToOne(() => Salon, (salon) => salon.packages)
  salon: Salon;
}
