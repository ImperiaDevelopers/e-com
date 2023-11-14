import { ApiProperty } from '@nestjs/swagger';

export class CreateProductInStockDto {
  @ApiProperty({ example: 10, description: 'ProductInStock product id' })
  product_id: number;

  @ApiProperty({ example: 10, description: 'ProductInStock Aksiya id' })
  sale_id: number;
}
