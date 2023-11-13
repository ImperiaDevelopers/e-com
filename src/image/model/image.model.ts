import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
// import { Product } from "./product.model";

interface ImageAttributes {
  image: string;
  product_id: number;
}

@Table({ tableName: "image" })
export class Image extends Model<Image, ImageAttributes> {
  @ApiProperty({
    example: 1,
    description: "Image ID",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "image.jpg",
    description: "Name of the image file",
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: "ID of the associated product",
  })
//   @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  product_id: number;

//   @BelongsTo(() => Product)
//   product: Product;
}
