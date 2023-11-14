import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category text', description: 'Text category' })
  @IsString()
  text: string;

  @ApiProperty({ example: 7, description: 'Client Id' })
  @IsNumber()
  client_id: number;

  @ApiProperty({ example: 7, description: 'Product Id' })
  @IsNumber()
  product_id: number;
}
