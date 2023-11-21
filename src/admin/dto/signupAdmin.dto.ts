import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpAdminDto {
  @ApiProperty({ example: 'Falonchi', description: 'Ism' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Falonchiyev', description: 'Familiya' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+998901234567', description: 'Raqam' })
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'qwerty', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
