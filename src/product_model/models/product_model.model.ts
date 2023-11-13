import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

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
  //   @ForeignKey(() => CategoryBrand)
  @Column({
    type: DataType.INTEGER,
  })
  category_brand_id: number;

  @ApiProperty({ example: 'image.png', description: 'ProductModel rasmi' })
  @Column({
    type: DataType.STRING,
  })
  image: string;
}
