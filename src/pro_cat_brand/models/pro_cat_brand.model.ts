import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

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
  //   @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of pro_brand_id',
  })
  //   @ForeignKey(() => ProBrand)
  @Column({
    type: DataType.INTEGER,
  })
  pro_brend_id: number;

  //   @BelongsTo(() => Category)
  //   category: Category[]

  //   @BelongsTo(() => ProBrand)
  //   proBrand: ProBrand
}
