import { ApiProperty } from '@nestjs/swagger';

export class FindBySortDto {
  price?: {
    from?: number;
    to?: number;
  };
  category?: number;
  brend?: number;
  attributes: { attribute_id: number; attribute_value: string }[];

}
