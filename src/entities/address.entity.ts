import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";

@Entity("address")
export class Address extends Model {
  @Column()
  street: string;

  @Column()
  city: string;

  @ManyToOne(() => Salon, salon => salon.addresses)
  salon: Salon; // Many addresses belong to one salon
}

