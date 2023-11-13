import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface DeliverAttrs {
  name: string;
  order_id: number;
}

@Table({ tableName: 'deliver' })
export class Deliver extends Model<Deliver, DeliverAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'deliver1',
    description: 'Deliver nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({
    example: 'order_id',
    description: 'Deliver "order_id"si',
  })
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;
}
