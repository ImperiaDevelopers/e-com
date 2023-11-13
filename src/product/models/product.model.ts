import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProductAttrs {
  name: string;
  category_id: number;
  price: number;
  product_brand_id: number;
  product_model_id: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'product1', description: 'Product nomi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1000, description: 'Product narxi' })
  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @ApiProperty({ example: 1000, description: 'Product Category' })
  //   @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @ApiProperty({ example: 1000, description: 'Product Brand' })
  //   @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  product_brand_id: number;

  @ApiProperty({ example: 1000, description: 'Product Model' })
  //   @ForeignKey(()=>ProductModel)
  @Column({
    type: DataType.INTEGER,
  })
  product_model_id: number;
  
}
