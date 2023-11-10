import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProInfoAttrs {
  product_id: number;
  performers_id: number;
  performers_value: string;
  main: string;
}

@Table({ tableName: 'pro_info' })
export class ProInfo extends Model<ProInfo, ProInfoAttrs> {
  @ApiProperty({
    example: 'id',
    description: 'The id of the pro_info',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of product',
  })
  //   @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of performers',
  })
  //   @ForeignKey(() => Performers)
  @Column({
    type: DataType.INTEGER,
  })
  performers_id: number;

  @ApiProperty({
    example: 'value => 15px',
    description: 'the value of performers',
  })
  @Column({
    type: DataType.STRING,
  })
  performers_value: string;

  @ApiProperty({
    example: 'main info',
    description: 'the info for product',
  })
  @Column({
    type: DataType.STRING,
  })
  main: string;

  //   @BelongsTo(() => Product)
  //   product: Product[]

  //   @BelongsTo(() => Performers)
  //   performers: Performers
}
