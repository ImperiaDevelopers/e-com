import { ApiProperty } from "@nestjs/swagger";

export class ProductByPrice {
  @ApiProperty({ example: '354354', description: 'Product bosh narxi' })
  from: number;

  @ApiProperty({ example: '354354', description: 'Product oxir narxi' })
  to: number;
}
