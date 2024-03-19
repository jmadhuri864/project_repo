import config from 'config';
import { DeepPartial, FindOneOptions } from 'typeorm';
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

export const updateUser = async (
  where: FindOneOptions<User>['where'],
  data: DeepPartial<User>
): Promise<User | undefined> => {
  //const userRepository = getRepository(User);

  try {
    const userToUpdate = await userRepository.findOne({ where });

    if (userToUpdate) {
      Object.assign(userToUpdate, data);
      const updatedUser = await userRepository.save(userToUpdate);
      return updatedUser;
    } else {
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
