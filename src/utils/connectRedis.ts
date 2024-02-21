import { createClient } from 'redis';

// const redisUrl = 'redis://localhost:6379';
//const redisUrl = 'rediss://default:AVNS_j2KxzPsOnnIKVbSjnK3@redis-2ad1d044-jadhavm21199-22ca.a.aivencloud.com:26318';
//const redisUrl = 'rediss://red-cnapgof109ks739nql5g:kpQis18TQmio9mGK8zPbRAopbvUfymZu@singapore-redis.render.com:6379';

const redisUrl='redis://default:d68e94018e7845f19c0363e92ec6dae3@hardy-anchovy-30917.upstash.io:30917'
const redisClient = createClient({
  url: redisUrl,
});
//import { createClient } from 'redis';

// const redisClient = createClient({
//     password: 'qzmOA6de2frjXAGW2Q3e8441xdscT0kY',
//     socket: {
//         host: 'redis-14789.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
//         port: 14789
//     }
// });

const connectRedis = async () => {
  try {
    await redisClient.connect();
    
    console.log('Redis client connected successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
    
  }
};

connectRedis();

export default redisClient;
