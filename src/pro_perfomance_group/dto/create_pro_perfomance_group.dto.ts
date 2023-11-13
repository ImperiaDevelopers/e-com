import { ApiProperty } from '@nestjs/swagger';

export class CreateProPerfomanceGroupDto {
  @ApiProperty({
    example: 'pro_perfomance_group1',
    description: 'ProPerfomanceGroup nomi',
  })
  name: string;
  @ApiProperty({
    example: 'category_id',
    description: 'ProPerfomanceGroup rasmi',
  })
  category_id: number;
}
