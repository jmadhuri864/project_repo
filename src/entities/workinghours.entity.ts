import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./model.entity";
import { Salon } from "./salon.entity";
//import Model from "./model.entity";
//import { Salon } from "./salon.entity";

@Entity("working_hours")
export class WorkingHours extends Model {

    @Column({ type: "varchar", length: 10 })
    startDay: string; // Monday, Tuesday, ...

    @Column({ type: "varchar", length: 10 })
    endDay: string; // Monday, Tuesday, ...

    @Column({ type: "time" })
    openingTime: Date;

    @Column({ type: "time" })
    closingTime: Date;

    @ManyToOne(() => Salon, salon => salon.workingHours)
    salon: Salon; // Many-to-one relationship with Salon entity
}
