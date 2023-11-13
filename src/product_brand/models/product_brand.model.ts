import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ProductBrandAttrs {
  name: string;
  image: string;
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  image: string;
}
