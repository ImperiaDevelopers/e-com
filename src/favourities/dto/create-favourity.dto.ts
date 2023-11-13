import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFavourityDto {
  @ApiProperty({
    example: '5',
    description: 'the id of client',
  })
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @ApiProperty({
    example: '6',
    description: 'the id of product',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
