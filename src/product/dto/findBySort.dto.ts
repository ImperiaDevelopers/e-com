import { ApiProperty } from '@nestjs/swagger';

export class FindBySortDto {
  price?: {
    from?: number;
    to?: number;
  };
  category_id?: number;
  brend?: number;
  attributes: { attribute_id: number; attribute_value: string }[];
}
