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

interface CardAttrs {
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

  @ApiProperty({ example: 23000, description: 'Price' })
  @Column({
    type: DataType.INTEGER,
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
