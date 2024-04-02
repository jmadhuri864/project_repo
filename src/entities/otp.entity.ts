import { Column, Entity, OneToOne } from "typeorm";
import Model from "./model.entity";
import { User } from "./user.entity";

@Entity("otp")
export class OTPclass extends Model 
{
  @Column()
  otp: string;
@Column()
email:string
@Column({nullable:true})
expiresAt:Date
//   @OneToOne(() => User, (user) => user.otp)
//   user: User;
}