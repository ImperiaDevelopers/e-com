import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProCatBrand } from '../../pro_cat_brand/models/pro_cat_brand.model';
interface CategoryAtr {
  category_name: string;
  icon: string;
  parent_category_id: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  category_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  parent_category_id: number;

  @BelongsTo(() => Category)
  parent_category: Category;
  
  // @HasMany(() => ProCatBrand)
  // pro_cat_brands: ProCatBrand[];
}
