import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";
import { Salon } from "./salon.entity";


@Entity("bookmark")
export class Bookmark extends Model {


    

    @Column()
    salonId:string;
  
    @Column({ default: false })
    bookmarked: boolean;

    

}