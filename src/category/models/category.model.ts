import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CategoryAttrs {
  rating: number;
  category_name: string;
  parent_category_id: number;
  icon: string;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'category name', description: 'name category' })
  @Column({ type: DataType.STRING })
  category_name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parent_category_id: number;
  @BelongsTo(() => Category, 'parent_category_id')
  parent_category: Category;

  @ApiProperty({ example: 'icon', description: 'icon category' })
  @Column({ type: DataType.STRING })
  icon: string;
}
