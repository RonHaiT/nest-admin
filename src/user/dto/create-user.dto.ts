import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;
  @ApiProperty({
    example: 'xxx@xx.com',
    description: '用户邮箱',
  })
  email: string;
  @ApiProperty({
    example: '18111111111',
    description: '手机号',
  })
  phone: string;
}
