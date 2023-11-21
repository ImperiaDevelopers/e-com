import { Table, Model, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "district" })
export class District extends Model<District> {
  @ApiProperty({
    example: 1,
    description: "District ID",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "District A",
    description: "Name of the district",
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
