import { createClient } from 'redis';

//const redisUrl = 'redis://localhost:6379';
const redisUrl='rediss://red-cna57b21hbls73diq0f0:ttfFBPyZAKZHrV2IjghAiCtR5SFmdk6Y@singapore-redis.render.com:6379'
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
