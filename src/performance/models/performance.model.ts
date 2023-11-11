import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

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

  // @ForeignKey(() => Pro_performance)
  @Column({
    type: DataType.INTEGER,
  })
  pro_performance_group_id: number;

  // @BelongsTo(() => Pro_performance)
  // pro_performance_group: Pro_performance;
}
