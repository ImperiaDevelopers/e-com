import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from '../../order/models/order.model';

interface DeliverAttrs {
  name: string;
  order_id: number;
}

@Table({ tableName: 'deliver' })
export class Deliver extends Model<Deliver, DeliverAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;
  @BelongsTo(() => Order)
  order: Order;
}
