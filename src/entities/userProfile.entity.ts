import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import Model from "./model.entity";

@Entity("profile")
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: string;

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

    @Column()
    image: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}