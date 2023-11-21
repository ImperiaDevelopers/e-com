import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusDto {
  @ApiProperty({ example: "Confirm", description: "Status name" })
  @IsString()
  status_name: string;
}
