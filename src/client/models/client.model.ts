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
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Sobir', description: 'Client first name' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'Karimov',
    description: 'Client last name',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({ example: 'email', description: 'enter email' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email: string;

  @ApiProperty({ example: 'phone', description: 'enter phone number' })
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
