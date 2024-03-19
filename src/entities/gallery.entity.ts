import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";

@Entity("gallery")
export class Gallery extends Model {
  @Column()
  imageUrl: string;

  @ManyToOne(() => Salon, (salon) => salon.gallery)
  salon: Salon;
}