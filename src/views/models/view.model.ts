import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../client/models/client.model';
import { Product } from '../../product/models/product.model';

interface ViewsAttrs {
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'vews' })
export class View extends Model<View, ViewsAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 1, description: 'Client Id' })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;
  @BelongsTo(() => Client)
  client = Client;

  @ApiProperty({ example: 7, description: 'Product Id' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product = Product;
}
