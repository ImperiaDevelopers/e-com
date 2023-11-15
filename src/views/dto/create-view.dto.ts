import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateViewDto {
  @ApiProperty({ example: 1, description: 'Client Id' })
  @IsNumber()
  client_id: number;

  @ApiProperty({ example: 1, description: 'Product Id' })
  @IsNumber()
  product_id: number;
}
