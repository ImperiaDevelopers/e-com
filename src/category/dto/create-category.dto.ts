import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category name', description: 'name category' })
  category_name: string;

  parent_category_id: number;

  @ApiProperty({ example: 'icon', description: 'icon category' })
  icon: string;
}
