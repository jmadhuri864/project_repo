import { User } from "../entities/user.entity";
import { UserProfile } from "../entities/userProfile.entity";
import { AppDataSource } from "../utils/data-source";


const userProfileRepository = AppDataSource.getRepository(UserProfile);

export const createProfile = async (input: Partial<UserProfile>, user: User) => {
    return await userProfileRepository.save(userProfileRepository.create({ ...input, user }));
  };