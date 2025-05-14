import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from './cache/cache.module';
const isProd = process.env.NODE_ENV === 'production';

const isDev = process.env.NODE_ENV === 'development';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: isProd
        ? path.resolve(__dirname, '../.env.prod')
        : path.resolve(__dirname, '../.env'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        console.log('configService.get', configService.get('DB_PASSWORD'));

        return {
          type: 'mysql',
          host: configService.get('DB_HOST'),
          connectorPackage: 'mysql2',
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User],
          synchronize: !isProd,
          logging: isDev,
        };
      },
      inject: [ConfigService],
    }),
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
