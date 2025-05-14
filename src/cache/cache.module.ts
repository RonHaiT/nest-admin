import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    CacheService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(configService: ConfigService) {
        const client = createClient({
          socket: {
            host: configService.get('RD_HOST'),
            port: parseInt(configService.get('RD_PORT') || '6379'),
          },
        });
        client.on('error', (err) => console.error('Redis Client Error', err));
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class CacheModule {}
