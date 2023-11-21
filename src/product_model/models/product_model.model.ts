import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProCatBrand } from '../../pro_cat_brand/models/pro_cat_brand.model';

interface ProductModelAttrs {
  name: string;
  category_brand_id: number;
  image: string;
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
  @ForeignKey(() => ProCatBrand)
  @Column({
    type: DataType.INTEGER,
  })
  category_brand_id: number;
  @BelongsTo(() => ProCatBrand)
  category_brand: ProCatBrand;

  @ApiProperty({ example: 'image.png', description: 'ProductModel rasmi' })
  @Column({
    type: DataType.STRING,
  })
  image: string;
}
