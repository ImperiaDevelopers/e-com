import { ApiProperty } from '@nestjs/swagger';

export class CreateProductModelDto {
  @ApiProperty({ example: 'product_model1', description: 'ProductModel nomi' })
  name: string;

  @ApiProperty({ example: 1, description: 'ProductModel Category' })
  category_brand_id: number;
  
  @ApiProperty({ example: 'image.png', description: 'Image' })
  image?: string;
}
