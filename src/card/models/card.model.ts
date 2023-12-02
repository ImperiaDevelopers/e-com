import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Client } from '../../client/models/client.model';

interface CardAttrs {
  client_id: number;
  product_id: number;
  price: number;
  quantity: number;
}

@Table({ tableName: 'card' })
export class Card extends Model<Card, CardAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;
  @BelongsTo(() => Client)
  client: Client;

  @ApiProperty({ example: 23000, description: 'Price' })
  @Column({
    type: DataType.DECIMAL(20, 10),
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 1, description: 'Quantity' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;
}
