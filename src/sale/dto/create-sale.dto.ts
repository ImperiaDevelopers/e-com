import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @ApiProperty({ example: 10, description: 'Sale foizi' })
  percent: number;

  @ApiProperty({ example: '10.10.2023', description: 'Qachondan' })
  from: string;

  @ApiProperty({ example: '15.10.2023', description: 'Qachongacha' })
  string;
}
