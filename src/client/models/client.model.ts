import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ClientAttrs {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hashed_token: string;
  is_active: boolean;
}

@Table({ tableName: 'client' })
export class Client extends Model<Client, ClientAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  phone_number: string;

  @Column({
    type: DataType.STRING,
    defaultValue: null,
  })
  hashed_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  })
  is_active: boolean;
}
