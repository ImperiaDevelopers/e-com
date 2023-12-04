import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'Region A',
    description: 'Name of the region',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
