import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @ApiProperty({ example: 7, description: 'Product Id' })
  product_id: number;

  @ApiProperty({ example: 7, description: 'Client Id' })
  client_id: number;

  @ApiProperty({ example: 23000, description: 'Price ' })
  price: number;

  @ApiProperty({ example: 1, description: 'Quantity' })
  quantity: number;
}
