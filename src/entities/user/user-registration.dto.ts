import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class UserRegistrationDto {
  @ApiProperty({ description: 'Username for registration', example: 'good_guy' })
  @IsString()
  @MinLength(3, { message: 'Username must be longer than 3 characters' })
  @MaxLength(16, { message: 'Username must be less than 16 characters long' })
  userName: string;

  @ApiProperty({ description: 'Password for registration', example: 'securePass1' })
  @IsStrongPassword({ minLength: 6, minNumbers: 0, minSymbols: 0 })
  @MaxLength(16, { message: 'Password must be shorter than 16 characters' })
  password: string;
}
