import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetRegionByNameDto {
  @ApiProperty({
    example: 'Baker street',
    description: 'Name of the Region',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
