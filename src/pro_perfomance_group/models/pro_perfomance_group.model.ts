import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface ProPerfomanceGroupAttrs {
  name: string;
  category_id: number;
}

@Table({ tableName: 'pro_perfomance_group' })
export class ProPerfomanceGroup extends Model<
  ProPerfomanceGroup,
  ProPerfomanceGroupAttrs
> {
  @ApiProperty({ example: 1, description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'pro_perfomance_group1',
    description: 'ProPerfomanceGroup nomi',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;
  @ApiProperty({
    example: 'category_id',
    description: 'ProPerfomanceGroup "category_id"si',
  })
  @Column({
    type: DataType.INTEGER,
  })
  category_id: number;
}
