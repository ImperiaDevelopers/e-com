<<<<<<< HEAD
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Payment } from '../../payment/models/payment.model';
import { Status } from '../../status/models/status.model';
import { Region } from '../../region/model/region.model';
import { Client } from '../../client/models/client.model';
import { District } from '../../district/model/district.model';
import { Card } from '../../card/models/card.model';

interface OrderAtr {
  client_id: number;
  product_id: number;
  region_id: number;
  district_id: number;
  payment_id: number;
  status_id: number;
  card_id: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAtr> {
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
  client: Client;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
  @BelongsTo(() => Region)
  parent_category: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
  })
  payment_id: number;
  @BelongsTo(() => Payment)
  payment: Payment;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
  })
  card_id: number;
  @BelongsTo(() => Card)
  card: Card;
}
=======
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Payment } from '../../payment/models/payment.model';
import { Status } from '../../status/models/status.model';
import { Region } from '../../region/model/region.model';
import { Client } from '../../client/models/client.model';
import { District } from '../../district/model/district.model';
import { Card } from '../../card/models/card.model';

interface OrderAtr {
  client_id: number;
  product_id: number;
  region_id: number;
  district_id: number;
  payment_id: number;
  status_id: number;
  card_id: number;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAtr> {
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
  client: Client;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;
  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;
  @BelongsTo(() => Region)
  parent_category: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
  })
  payment_id: number;
  @BelongsTo(() => Payment)
  payment: Payment;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;

  @ForeignKey(() => Card)
  @Column({
    type: DataType.INTEGER,
  })
  card_id: number;
  @BelongsTo(() => Card)
  card: Card;
}
>>>>>>> ae5b6806075403e8f852b40d413acbd99d3319da
