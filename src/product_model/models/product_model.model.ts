import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from '../../category/models/category.model';
import { ProductBrand } from '../../product_brand/models/product_brand.model';

interface ProductModelAttrs {
  name: string;
  category_id: number;
  brand_id: number;
}

@Table({ tableName: 'product_model' })
export class ProductModel extends Model<ProductModel, ProductModelAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'product_model1', description: 'ProductModel nomi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 1, description: 'ProductModel Category' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({ example: 1, description: 'ProductModel Brand' })
  @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  brand_id: number;
  @BelongsTo(() => ProductBrand)
  brand: ProductBrand;
}


