import { ApiProperty } from '@nestjs/swagger';

export class FindBySortDto {
  @ApiProperty({ example: 'from', description: 'from' })
  from?: number;
  @ApiProperty({ example: 'to', description: 'to' })
  to?: number;
  @ApiProperty({ example: 'brand', description: 'brend' })
  brend?: string;
  @ApiProperty({ example: 'ram', description: 'ram' })
  ram?: string;
  @ApiProperty({ example: 'acc', description: 'rom' })
  acc?: string;
  @ApiProperty({ example: 'category_id', description: 'id' })
  category_id: string;
}
