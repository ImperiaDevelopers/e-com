import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductBrand } from '../../product_brand/models/product_brand.model';
import { ProductModel } from '../../product_model/models/product_model.model';
import { Categor } from '../../category/models/category.model';

interface ProductAttrs {
  name: string;
  category_id: number;
  price: number;
  product_brand_id: number;
  product_model_id: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductAttrs> {
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
    type: DataType.INTEGER,
  })
  price: number;

  @ForeignKey(() => Categor)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Categor)
    category: Categor;

  @ForeignKey(() => ProductBrand)
  @Column({
    type: DataType.INTEGER,
  })
  product_brand_id: number;
  @BelongsTo(() => ProductBrand)
  product_brand: ProductBrand;

  @ForeignKey(() => ProductModel)
  @Column({
    type: DataType.INTEGER,
  })
  product_model_id: number;
  @BelongsTo(() => ProductModel)
  product_model: ProductModel;
}
