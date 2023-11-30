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

interface ProductInStockAttrs {
  product_id: number;
  duration: number;
  from: string;
  to: string;
}

@Table({ tableName: 'product_in_stock' })
export class ProductInStock extends Model<ProductInStock, ProductInStockAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @Column({
    type: DataType.INTEGER,
  })
  duration: number;

  @Column({
    type: DataType.INTEGER,
  })
  percent: number;

  @Column({
    type: DataType.STRING,
    defaultValue: new Date(),
  })
  from: string;

  @Column({
    type: DataType.STRING,
  })
  to: string;
}
