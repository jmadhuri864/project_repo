
import { User } from "../entities/user.entity";
import { UserProfile } from "../entities/userProfile.entity";
import { AppDataSource } from "../utils/data-source";


const userProfileRepository = AppDataSource.getRepository(UserProfile);

export const createProfile = async (input: Partial<UserProfile>, user: User) => {
    return await userProfileRepository.save(userProfileRepository.create({ ...input,user }));


  };
 export const getprofile = async(email:string)=> {
  try {
    // Retrieve the user profile by email
    const userProfile = await userProfileRepository.findOne({ where: { email } });
    return userProfile;
  }
  catch (error) {
    console.error('Error fetching user profile by email:', error);
    throw new Error('Error fetching user profile by email');
  }
};
  export const getUserProfileByNickname = async (email: string): Promise<string | null> => {
    try {
      // Retrieve the user profile by email
      const userProfile = await userProfileRepository.findOne({ where: { email } });
  
      // If userProfile is found, return the nickname, otherwise return null
      return userProfile ? userProfile.nickname : null;
    } catch (error) {
      console.error('Error fetching user profile by email:', error);
      throw new Error('Error fetching user profile by email');
    }
  };
  