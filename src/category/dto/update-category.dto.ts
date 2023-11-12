import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ example: 'Smartphones', description: 'Kategoriya nomi' })
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @ApiProperty({ example: 'smt.png', description: 'Icon, rasm linki' })
  @IsString()
  icon: string;

  @ApiProperty({ example: '1', description: 'Parent category id' })
  parent_category_id: number;
}
