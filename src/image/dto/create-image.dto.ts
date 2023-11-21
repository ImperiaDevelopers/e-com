import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({
    example: 'image.jpg',
    description: 'Name of the image file',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: '123',
    description: 'ID of the product associated with the image',
  })
  @IsNotEmpty()
  @IsString()
  product_id: number;
}
