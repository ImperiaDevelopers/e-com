import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'product1', description: 'Product nomi' })
  name: string;

  @ApiProperty({ example: 1000, description: 'Product narxi' })
  price: number;

  @ApiProperty({ example: 1000, description: 'Product Category' })
  category_id: number;
  @ApiProperty({ example: 1000, description: 'Product Brand' })
  product_brand_id: number;

  @ApiProperty({ example: 1000, description: 'Product Model' })
  product_model_id: number;

    @ApiProperty({ example: 1000, description: 'Product quantity' })
    quantity: number;
}
