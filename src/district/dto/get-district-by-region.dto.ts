import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDistrictByRegionDto {
  @ApiProperty({
    example: 'District A',
    description: 'Name of the district',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
