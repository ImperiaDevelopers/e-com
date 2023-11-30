import { ApiProperty } from '@nestjs/swagger';

export class CreateProductModelDto {
  @ApiProperty({ example: 'product_model1', description: 'ProductModel nomi' })
  name: string;

  @ApiProperty({ example: 1, description: 'ProductModel Category' })
  category_id: number;
  @ApiProperty({ example: 1, description: 'ProductModel Category' })
  brand_id: number;
}
