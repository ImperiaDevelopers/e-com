import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductBrand } from '../../product_brand/models/product_brand.model';
import { Categor } from '../../category/models/category.model';

interface ProCatBrandAttrs {
  category_id: number;
  pro_brend_id: number;
}

@Table({ tableName: 'pro_cat_brand' })
export class ProCatBrand extends Model<ProCatBrand, ProCatBrandAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => Categor)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() =>Categor,'category_id')
  category: Categor;

  @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  pro_brend_id: number;

  @BelongsTo(() => ProductBrand)
  proBrand: ProCatBrand;
}
