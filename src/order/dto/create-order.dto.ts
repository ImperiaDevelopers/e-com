import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Client id' })
  client_id: number;

  @ApiProperty({ example: 2, description: 'Product id' })
  product_id: number;

  @ApiProperty({ example: 1, description: 'Region id' })
  region_id: number;

  @ApiProperty({ example: 1, description: 'District id' })
  district_id: number;

  @ApiProperty({ example: 1, description: 'Payment id' })
  payment_id: number;

  @ApiProperty({ example: 1, description: 'Status id' })
  status_id: number;

  @ApiProperty({ example: 1, description: 'Card id' })
  card_id: number;
}
