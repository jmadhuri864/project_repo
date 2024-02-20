import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";

@Entity("services")
export class Service extends Model {
  @Column()
  name: string;

  @ManyToOne(() => Salon, (salon) => salon.services)
  salon: Salon;
}
