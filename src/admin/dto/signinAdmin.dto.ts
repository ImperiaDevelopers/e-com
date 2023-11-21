import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInAdminDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
