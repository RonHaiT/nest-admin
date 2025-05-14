import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { ApiException } from 'src/common/filter/http-exception/api.exception.filter';
import { CacheService } from 'src/cache/cache.service';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserVo } from './vo/create-user.vo';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController');
  }

  @ApiOperation({
    summary: '创建用户',
    description: '创建用户',
  })
  @ApiOkResponse({
    description: '返回示例',
    type: CreateUserVo,
  })
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Register request received:', createUserDto); // 添加日志
    return await this.userService.create(createUserDto);
  }

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }
}
