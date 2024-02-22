import { Column, Entity, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { Barber } from "./barber.entity";
import { Service } from "./service.entity";
import { Package } from "./package.entity";
import { Review } from "./review.entity";

// Define a constant array of valid categories
//const VALID_CATEGORIES = ["Haircuts", "Makeup", "Manicure", "Massage","All"];
@Entity("salon")
export class Salon extends Model {
  @Column()
  name: string;

  @Column()
  contactno: string;

  @Column({ type: "simple-array" , nullable: true })
  categories: string[] ;

  @OneToMany(() => Address, address => address.salon)
  addresses: Address[]; // One salon can have multiple addresses (branches)

  @OneToMany(() => Barber, (barber) => barber.salon)
  barbers: Barber[];

  @OneToMany(() => Service, (service) => service.salon)
  services: Service[];

  @OneToMany(() => Package, (package1) => package1.salon)
  packages: Package[];

  @OneToMany(() => Review, (review) => review.salon)
  reviews: Review[];

  

 
}
