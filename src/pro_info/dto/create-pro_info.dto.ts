import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProInfoDto {
  @ApiProperty({
    example: '5',
    description: 'the id of product',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of performers',
  })
  @IsNotEmpty()
  @IsNumber()
  performers_id: number;

  @ApiProperty({
    example: 'value => 15px',
    description: 'the value of performers',
  })
  @IsNotEmpty()
  @IsString()
  performers_value: string;

  @ApiProperty({
    example: 'main info',
    description: 'the info for product',
  })
  @IsNotEmpty()
  @IsString()
  main: string;
}
