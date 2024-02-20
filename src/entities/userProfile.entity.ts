import { Column, Entity, JoinColumn, OneToOne} from "typeorm";
import { User } from "./user.entity";
import Model from "./model.entity";

@Entity("profile")
export class UserProfile extends Model {
    

    @Column()
    fullName: string;

    @Column()
    nickname: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column()
    email: string;

    @Column()
    mobileNumber: string;

    @Column()
    gender: string;

    @Column({ default: 'default.jpeg' })
    image: string;

    @OneToOne(() => User,user =>user.profile) // Specify the related entity
   // @JoinColumn()
    user: User; // Define the property to hold the related entity
  }
