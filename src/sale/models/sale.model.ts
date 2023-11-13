import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SaleAttrs {
  percent: number;
  from: string;
  to: string;
}

@Table({ tableName: 'sale' })
export class Sale extends Model<Sale, SaleAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 10, description: 'Sale foizi' })
  @Column({
    type: DataType.INTEGER,
  })
  percent: number;

  @ApiProperty({ example: '10.10.2023', description: 'Qachondan' })
  @Column({
    type: DataType.STRING,
  })
  from: string;

  @ApiProperty({ example: '15.10.2023', description: 'Qachongacha' })
  @Column({
    type: DataType.STRING,
  })
  to: string;
}
