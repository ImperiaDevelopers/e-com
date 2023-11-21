import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProCatBrandDto {
  @ApiProperty({
    example: '5 => (telefon, mebel va h.k.)',
    description: 'the id of category',
  })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of product_brend',
  })
  @IsNotEmpty()
  @IsNumber()
  pro_brend_id: number;
}
