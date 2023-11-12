import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePerformanceDto {
  @ApiProperty({ example: 'Smart', description: 'Ishlashi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'It is very good at battary',
    description: 'Something about product',
  })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({ example: 1, description: 'Pro performance group id' })
  pro_performance_group_id: number;
}
