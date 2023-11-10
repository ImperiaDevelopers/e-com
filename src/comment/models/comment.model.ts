import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

interface CommentAttrs {
  rating: number;
  text: string;
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'comment text', description: 'Text comment' })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({ example: 7, description: 'Client Id' })
  // @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;

  @ApiProperty({ example: 7, description: 'Product Id' })
  // @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
}
