import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StatusAttrs {
  status_name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Confirm', description: 'Status name' })
  @Column({ type: DataType.STRING })
  status_name: string;
}
