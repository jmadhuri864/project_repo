import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { Salon } from "./salon.entity";

@Entity("aboutus")
export class Aboutus extends Model {

    @Column()
    description:string;

    
    
  @ManyToOne(() => Salon, salon => salon.aboutus)
  salon: Salon; // Many addresses belong to one salon
}
