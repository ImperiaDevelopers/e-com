import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Sale } from '../../sale/models/sale.model';
import { Product } from '../../product/models/product.model';

interface ProductInStockAttrs {
  product_id: number;
  sale_id: number;
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

  @ForeignKey(() => Sale)
  @Column({
    type: DataType.INTEGER,
  })
  sale_id: number;
  @BelongsTo(() => Sale)
  sale: Sale;
}
