import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'comment text', description: 'Text comment' })
  @IsString()
  text: string;

  @ApiProperty({ example: 7, description: 'Client Id' })
  @IsNumber()
  client_id: number;

  @ApiProperty({ example: 7, description: 'Product Id' })
  @IsNumber()
  product_id: number;
}
