import { ApiProperty } from '@nestjs/swagger';

export class CreateProductInStockDto {
  @ApiProperty({ example: 10, description: 'ProductInStock product id' })
  product_id: number;

  @ApiProperty({ example: 10, description: 'duration days' })
  duration: number;

  @ApiProperty({ example: 10, description: 'Stock opercent' })
  percent: number;

  @ApiProperty({
    example: '10.10.2023=>oy-kun-yil',
    description: 'Qachondan oy-kun-yil',
  })
  from: string;

  @ApiProperty({ example: '12.10.2023', description: 'Qachongacha' })
  to?: string;
}
