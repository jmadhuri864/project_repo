import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";

@Entity("reviews")
export class Review extends Model
 {
  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column()
  likes: number;

  @Column()
  stars: number;

  @ManyToOne(() => Salon, (salon) => salon.reviews)
  salon: Salon;
}
