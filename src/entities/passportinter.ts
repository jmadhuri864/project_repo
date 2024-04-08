import { User as ExpressUser } from 'express';
export interface PassportUser extends ExpressUser {
    // Define additional properties required by Passport.js
    id:string
    email: string;
    password:string;
    googleId:string;
    // Add other properties as needed (e.g., googleId, password, etc.)
  }
  