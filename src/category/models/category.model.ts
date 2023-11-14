import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CategorAttrs {
  rating: number;
  category_name: string;
  parent_category_id: number;
  icon: string;
}

@Table({ tableName: 'categor' })
export class Categor extends Model<Categor, CategorAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'category name', description: 'name category' })
  @Column({ type: DataType.STRING })
  category_name: string;

  @ForeignKey(() => Categor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parent_category_id: number;
  @BelongsTo(() => Categor, 'parent_category_id')
  parent_category: Categor;

  @ApiProperty({ example: 'icon', description: 'icon category' })
  @Column({ type: DataType.STRING })
  icon: string;
}
