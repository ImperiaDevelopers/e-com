import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'category name', description: 'name category' })
  @IsString()
  category_name: string;

  @ApiProperty({ example: 'icon', description: 'icon category' })
  @IsString()
  icon: string;
}


