import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PaymentAttrs {
  type: string;
}
@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, PaymentAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'MasterCard', description: 'Payment type' })
  @Column({ type: DataType.STRING })
  type: string;
}
