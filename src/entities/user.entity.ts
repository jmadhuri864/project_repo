import {
  Entity,
  Column,
  Index,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import Model from "./model.entity";
import { UserProfile } from "./userProfile.entity";
import { OTPclass } from "./otp.entity";

@Entity("users")
export class User extends Model {
  @Index("email_index")
  @Column({
    unique: true,
  })
  email: string;

  @Column({nullable:true})
  password: string;

  @Column({
    default: true,
  })
  verified: boolean;

  @Column({nullable:true, type: 'varchar' })
  provider:string|null

  @Column({nullable:true,type: 'varchar' })
  passwordResetToken:string|null

  @Column({nullable:true, type: 'timestamptz'})
  passwordResetAt:Date|null

  // @OneToOne(() => OTPclass)
  // @JoinColumn()
  // otp: OTPclass;
  
  @OneToOne(() => UserProfile)
  @JoinColumn()
  profile: UserProfile;

  @BeforeInsert()
  async hashPassword() 
  {if(this.password)
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }
}
