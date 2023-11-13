import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface FavourityAttrs {
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'favourity' })
export class Favourity extends Model<Favourity, FavourityAttrs> {
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
    example: 'id',
    description: 'the id of client',
  })
  @Column({
    type: DataType.INTEGER,
  })
  client_id: number;

  @ApiProperty({
    example: '5',
    description: 'the id of product',
  })
  //   @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
}
