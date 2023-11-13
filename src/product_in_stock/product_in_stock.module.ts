import { Module } from '@nestjs/common';
import { ProductInStockService } from './product_in_stock.service';
import { ProductInStockController } from './product_in_stock.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductInStock } from './models/product_in_stock.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductInStock])],
  controllers: [ProductInStockController],
  providers: [ProductInStockService],
})
export class ProductInStockModule {}
