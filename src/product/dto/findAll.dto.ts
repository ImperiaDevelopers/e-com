import { ApiProperty } from '@nestjs/swagger';

export class FindAllDto {
  @ApiProperty({ example: 'product1', description: 'Product nomi' })
  name: string;
}