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
  text: string;
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'category text', description: 'Text category' })
  @Column({ type: DataType.STRING })
  text: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
}
