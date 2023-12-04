import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Category } from './../../category/models/category.model';
import { ProCatBrand } from '../../pro_cat_brand/models/pro_cat_brand.model';
interface ProductBrandAttrs {
  name: string;
  image: string;
  category_id: number;
}

@Table({ tableName: 'product_brand' })
export class ProductBrand extends Model<ProductBrand, ProductBrandAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;

  @HasMany(() => ProCatBrand)
  pro_cat_brand: ProCatBrand;  
}



