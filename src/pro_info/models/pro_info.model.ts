import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Performance } from '../../performance/models/performance.model';

interface ProInfoAttrs {
  product_id: number;
  performers_id: number;
  performers_value: string;
  main: string;
}

@Table({ tableName: 'pro_info' })
export class ProInfo extends Model<ProInfo, ProInfoAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  // @BelongsTo(() => Product)
  // product: Product;

  // @ForeignKey(() => Performance)
  @Column({
    type: DataType.INTEGER,
  })
  performers_id: number;
  // @BelongsTo(() => Performance)
  // performance: Performance;

  @Column({
    type: DataType.STRING,
  })
  performers_value: string;

  @Column({
    type: DataType.STRING,
  })
  main: string;
}
