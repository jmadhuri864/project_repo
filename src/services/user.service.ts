import config from 'config';
import { DeepPartial, FindOneOptions, MoreThan } from 'typeorm';
import { User } from '../entities/user.entity';
import redisClient from '../utils/connectRedis';
import { AppDataSource } from '../utils/data-source';
import { signJwt } from '../utils/jwt';

const userRepository = AppDataSource.getRepository(User);

export const createUser = async (input: DeepPartial<User>) => {
  
  return userRepository.save(userRepository.create(input));
};

// export const updateUser = async (input: DeepPartial<User>): Promise<User> => {
//   //const userRepository = getRepository(User);

//   try {
//     const updatedUser = await userRepository.save(userRepository.create(input));
//     return updatedUser;
//   } catch (error) {
//     console.error('Error updating user:', error);
//     throw error;
//   }
// };

// export const updateUser = async (
//   where: FindOneOptions<User>['where'],
//   data: DeepPartial<User>
// ): Promise<User | undefined> => {
//   //const userRepository = getRepository(User);

//   try {
//     const userToUpdate = await userRepository.findOne({ where });

//     if (userToUpdate) {
//       Object.assign(userToUpdate, data);
//       const updatedUser = await userRepository.save(userToUpdate);
//       return updatedUser;
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     console.error('Error updating user:', error);
//     throw error;
//   }
// };


export const updateUser = async (
  where: FindOneOptions<User>['where'], // Criteria to find the user to update
  data: DeepPartial<User> // Data to update the user with
): Promise<User | undefined> => {
  //const userRepository = getRepository(User); // Obtain the repository for the User entity

  try {
    const userToUpdate = await userRepository.findOne({ where }); // Find the user to update

    if (userToUpdate) {
      // Set passwordResetToken to null if it's not provided in the data
      if (data.passwordResetToken === undefined) {
        userToUpdate.passwordResetToken = null;
      } else {
        userToUpdate.passwordResetToken = data.passwordResetToken;
      }
      
      // Set passwordResetAt to null if it's not provided in the data
      if (data.passwordResetAt === undefined) {
        userToUpdate.passwordResetAt = null;
      } else {
        userToUpdate.passwordResetAt = data.passwordResetAt as Date;
      }

      // Merge the updated data into the user entity
      Object.assign(userToUpdate, data);

      // Save the updated user entity
      const updatedUser = await userRepository.save(userToUpdate);

      // Return the updated user
      return updatedUser;
    } else {
      // User not found
      return undefined;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  return await userRepository.findOneBy({ email });
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};

export const findUserByReset = async (passwordResetToken: string): Promise<User | undefined> => {
  try {
    const user = await userRepository.findOne({
      where: {
        passwordResetToken,
        passwordResetAt:  MoreThan(new Date()),
      },
    });
    return user||undefined;
  } catch (error) {
    console.error('Error finding user by reset:', error);
    throw error;
  }
};
export const signTokens = async (user: User) => {
  // 1. Create Session
  redisClient.set(user.id, JSON.stringify(user), {
    EX: config.get<number>('redisCacheExpiresIn') * 60,
  });

  // 2. Create Access and Refresh tokens
  // const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
  //   expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  // });

  // Sign new access token
const access_token = signJwt({ sub: user.id }, 'accessTokenPrivateKey', {
  expiresIn: '5m',
});


  const refresh_token = signJwt({ sub: user.id }, 'refreshTokenPrivateKey', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  return { access_token, refresh_token };
};
