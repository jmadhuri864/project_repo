import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";

@Entity("barbers")
export class Barber extends Model {
  @Column()
  name: string;

  @Column()
  specialty: string;

  @ManyToOne(() => Salon, (salon) => salon.barbers)
  salon: Salon;
}
