import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'MasterCard', description: 'Payment type' })
  @IsString()
  type: string;
}
