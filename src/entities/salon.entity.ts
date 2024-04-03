import { Column, Entity, OneToMany } from "typeorm";
import Model from "./model.entity";
import { Address } from "./address.entity";
import { Barber } from "./barber.entity";
import { Service } from "./service.entity";
import { Package } from "./package.entity";
import { Review } from "./review.entity";
import { Gallery } from "./gallery.entity";
import { Booking } from "./booking.entity";

// Define a constant array of valid categories
export const VALID_CATEGORIES = ["Haircuts", "Makeup", "Manicure", "Massage","All"];
@Entity("salon")
export class Salon extends Model
 {
  
  @Column()
  name: string;

  @Column()
  contactno: string;

  @Column({
    default: 'default-salon.png',nullable:true
  })
  image: string;

  @Column({ type: "simple-array" })
  categories: string[]=[];


  @Column({ default: false ,nullable:true})
    bookmarked: boolean;
  
  @OneToMany(() => Address, (address) => address.salon)
  addresses: Address[]; // One salon can have multiple addresses (branches)

  @OneToMany(() => Barber, (barber) => barber.salon)
  barbers: Barber[];

  @OneToMany(() => Service, (service) => service.salon)
  services: Service[];

  @OneToMany(() => Package, (package1) => package1.salon)
  packages: Package[];

  @OneToMany(() => Review, (review) => review.salon)
  reviews: Review[];

  @OneToMany(() => Booking, booking => booking.salon)
  bookings: Booking[];

  @OneToMany(() => Gallery, (gallery) => gallery.salon,{nullable:true})
  gallery: Gallery[]|null; // One salon can have multiple gallery images

  // Custom setter to validate categories
  setCategories(categories: string[]) {
    // Check if at least one category is selected and all selected categories are valid
    if (!categories || categories.length === 0 || !categories.every(category => VALID_CATEGORIES.includes(category))) {
      throw new Error("Invalid categories selection");
    }
    this.categories = categories;
  }

  static isValidCategory(category: string): boolean {
    return VALID_CATEGORIES.includes(category);
  }
}
