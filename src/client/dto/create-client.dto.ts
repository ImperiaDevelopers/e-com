import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'Sobir', description: 'Client ismi' })
  @IsNotEmpty()
  @IsString()
  first_name: string;


  @ApiProperty({
    example: 'Karimov',
    description: 'Client Familiyasi',
  })
  last_name: string;

  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Client email',
  })
  email?: string;

  // @ApiProperty({
  //   example: '91-777-25-97',
  //   description: 'Client phone_number',
  // })
  // @Matches(/^\+998\d{9}$/, { message: 'Invalid phone number format' })
  // phone_number: string;
}
