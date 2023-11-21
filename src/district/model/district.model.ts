import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Region } from '../../region/model/region.model';

@Table({ tableName: 'district' })
export class District extends Model<District> {
  @ApiProperty({
    example: 1,
    description: 'District ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'District A',
    description: 'Name of the district',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Region)
  @ApiProperty({ example: 1, description: 'Region id' })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  district: Region;
}
