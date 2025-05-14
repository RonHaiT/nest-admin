import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  //设置值
  async set(key: string, value: any, ttl?: number): Promise<any> {
    if (ttl) {
      await this.redisClient.setEx(key, ttl, value);
    } else {
      await this.redisClient.set(key, value);
    }
  }
  //获取值
  async get(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  //删除值
  async del(key: string): Promise<number> {
    return await this.redisClient.del(key);
  }
  //清除缓存
  async flushAll(): Promise<any> {
    return await this.redisClient.flushAll();
  }
}
