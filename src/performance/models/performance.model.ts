import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProPerfomanceGroup } from '../../pro_perfomance_group/models/pro_perfomance_group.model';

interface PerformanceAtr {
  name: string;
  desc: string;
  pro_performance_group_id: number;
}

@Table({ tableName: 'performance' })
export class Performance extends Model<Performance, PerformanceAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  desc: string;

  @ForeignKey(() => ProPerfomanceGroup)
  @Column({
    type: DataType.INTEGER,
  })
  pro_performance_group_id: number;
  @BelongsTo(() => ProPerfomanceGroup)
  pro_performance_group: ProPerfomanceGroup;
}
