import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from '../../client/models/client.model';
import { Product } from '../../product/models/product.model';

interface CommentAttrs {
  rating: number;
  text: string;
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'comment text', description: 'Text comment' })
  @Column({ type: DataType.STRING })
  text: string;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  client_id: number;
<<<<<<< HEAD
  // @BelongsTo(() => Client)
  // client: Client;
=======
  @BelongsTo(() => Client)
  client = Client;
>>>>>>> 4a7b3513e764d2082aba4bf44f21ae86a6e40ded

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;
}
