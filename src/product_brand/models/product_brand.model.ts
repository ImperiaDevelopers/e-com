import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProductBrandAttrs {
  name: string;
  image: string;
}

@Table({ tableName: 'product_brand' })
export class ProductBrand extends Model<ProductBrand, ProductBrandAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'product_brand1', description: 'ProductBrand nomi' })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({ example: 'image.jpg', description: 'ProductBrand rasmi' })
  @Column({
    type: DataType.STRING,
  })
  image: string;
}
