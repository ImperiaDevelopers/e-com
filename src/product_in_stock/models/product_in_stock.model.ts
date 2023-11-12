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
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 10, description: 'ProductInStock product id' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product_id: number;
  @BelongsTo(() => Product, 'product_id')
  product: Product;

  @ApiProperty({ example: 10, description: 'ProductInStock Aksiya id' })
  @ForeignKey(() => Sale)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale_id: number;
  @BelongsTo(() => Sale, 'sale_id')
  sale: Sale;
}
