import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'category name', description: 'name category' })
  @IsString()
  category_name: string;

  @ApiProperty({ example: 1, description: 'Parent c. id' })
  // @IsNumber()
  parent_category_id?: number;

  @ApiProperty({ example: 'icon', description: 'icon category' })
  @IsString()
  icon: string;

  
}
