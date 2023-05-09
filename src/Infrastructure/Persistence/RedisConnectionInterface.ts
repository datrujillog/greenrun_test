import { Redis } from 'ioredis';

export interface RedisConnectionInterface {
  getConnection(): Redis;
}
