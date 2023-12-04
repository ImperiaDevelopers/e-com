import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateImageDto {
  @ApiProperty({
    example: 'new-image.jpg',
    description: 'Updated name of the image file (optional)',
  })
  @IsString()
  @IsNotEmpty()
  image?: string;

  @ApiProperty({
    example: '456',
    description: 'Updated ID of the product associated with the image (optional)',
  })
  @IsString()
  @IsNotEmpty()
  product_id?: number;
}
