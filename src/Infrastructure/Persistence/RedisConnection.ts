import RedisClient, { Redis } from 'ioredis';
import { injectable } from 'inversify';
import { RedisConnectionInterface } from './RedisConnectionInterface';

@injectable()
export default class RedisConnection implements RedisConnectionInterface {
  private connection: Redis;

  public constructor() {
    this.connection = new RedisClient({
      host: 'redis',
      port: 6379,
    });
  }
  public getConnection(): Redis {
    return this.connection;
  }
}
