import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Service } from "./service.entity";
import { Salon } from "./salon.entity";

@Entity("packages")
export class Package extends Model {
  @Column()
  name: string;

  @ManyToMany(() => Service)
  @JoinTable()
  includedServices: Service[];

  @ManyToOne(() => Salon, (salon) => salon.packages)
  salon: Salon;
}
