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

interface ProCatBrandAttrs {
  category_id: number;
  pro_brend_id: number;
}

@Table({ tableName: 'pro_cat_brand' })
export class ProCatBrand extends Model<ProCatBrand, ProCatBrandAttrs> {
  @ApiProperty({
    example: 'id',
    description: 'The id of the pro_cat_brand',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of category',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of pro_brand_id',
  })
  @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  pro_brend_id: number;

  @BelongsTo(() => Category)
  category: Category

  @BelongsTo(() => ProductBrand)
  proBrand: ProductBrand;
}
