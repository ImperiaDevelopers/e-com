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

interface ProPerfomanceGroupAttrs {
  name: string;
  category_id: number;
}

@Table({ tableName: 'pro_perfomance_group' })
export class ProPerfomanceGroup extends Model<
  ProPerfomanceGroup,
  ProPerfomanceGroupAttrs
> {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
  @BelongsTo(() => Category)
  category: Category;
}
