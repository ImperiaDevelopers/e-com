<<<<<<< HEAD
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

interface FavourityAttrs {
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'favourity' })
export class Favourity extends Model<Favourity, FavourityAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
  })
  client_id: number;
  @BelongsTo(() => Client)
  client = Client;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;
}
=======
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

interface FavourityAttrs {
  client_id: number;
  product_id: number;
}

@Table({ tableName: 'favourity' })
export class Favourity extends Model<Favourity, FavourityAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
  })
  client_id: number;
  @BelongsTo(() => Client)
  client = Client;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;
}
>>>>>>> ae5b6806075403e8f852b40d413acbd99d3319da
