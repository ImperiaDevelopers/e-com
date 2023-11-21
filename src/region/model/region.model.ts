import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'region' })
export class Region extends Model<Region> {
  @ApiProperty({
    example: 1,
    description: 'Region ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Region',
    description: 'Name of the region',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
