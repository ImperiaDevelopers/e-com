import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({
    type: DataType.INTEGER,
  })
  order_id: number;
}
