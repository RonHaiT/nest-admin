import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CacheModule } from '../cache/cache.module';
import { CacheService } from '../cache/cache.service';
@Module({
  imports: [TypeOrmModule.forFeature([User]), CacheModule],
  controllers: [UserController],
  providers: [UserService, CacheService],
})
export class UserModule {}
