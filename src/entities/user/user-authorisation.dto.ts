import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserAuthDto {
  @ApiProperty({ description: 'Username of the user', example: 'good_guy' })
  @IsString()
  userName: string;

  @ApiProperty({ description: 'Password of the user', example: 'strongPassword123' })
  @IsString()
  password: string;
}
