import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiProperty({
    example: 'District A',
    description: 'Name of the district',
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({ example: 1, description: 'Region id' })
  region_id: number;
}
