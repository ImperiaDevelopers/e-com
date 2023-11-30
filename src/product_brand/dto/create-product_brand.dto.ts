import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBrandDto {
  @ApiProperty({ example: 'product_brand1', description: 'ProductBrand nomi' })
  name: string;
  @ApiProperty({ example: 'image.jpg', description: 'ProductBrand rasmi' })
  image?: string;
  @ApiProperty({ example: 'Category', description: 'Category' })
  category_id?: number;
}



