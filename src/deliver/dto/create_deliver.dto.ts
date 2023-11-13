import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliverDto {
  @ApiProperty({
    example: 'deliver1',
    description: 'Deliver nomi',
  })
  name: string;
  @ApiProperty({
    example: 'order_id.jpg',
    description: 'Deliver rasmi',
  })
  order_id: number;
}
