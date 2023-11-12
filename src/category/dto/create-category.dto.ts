import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Smartphones', description: 'Kategoriya nomi' })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({ example: 'smt.png', description: 'Icon, rasm linki' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ example: 1, description: 'Parent category id' })
  parent_category_id: number;
}
