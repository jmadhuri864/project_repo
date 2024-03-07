import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";
import { nullable } from "zod";

@Entity("barbers")
export class Barber extends Model {
  @Column({nullable:true})
  first_name: string;
  @Column({nullable:true})
  last_name: string;
  @Column({
    default: 'default-barbers.png',nullable:true
  })
  image: string;
  @Column()
  specialty: string;

  @ManyToOne(() => Salon, (salon) => salon.barbers)
  salon: Salon;
}
