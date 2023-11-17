import { ApiProperty } from '@nestjs/swagger';

export class FindBySortDto {
  from?: number;
  to?: number;
  brend?: string;
  ram?: string;
  acc?: string;
}
