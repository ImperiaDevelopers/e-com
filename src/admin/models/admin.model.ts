import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAtr {
  first_name: String;
  last_name: String;
  phone: String;
  image: String;
  role: String;
  password: String;
  refresh_token: String;
  status: Boolean;
}

@Table({ tableName: 'Admin' })
export class Admin extends Model<Admin, AdminAtr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status: boolean;
}
