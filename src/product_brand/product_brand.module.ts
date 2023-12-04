import { Module } from '@nestjs/common';
import { ProductBrandService } from './product_brand.service';
import { ProductBrandController } from './product_brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductBrand } from './models/product_brand.model';

@Module({
  imports: [SequelizeModule.forFeature([ProductBrand])],
  controllers: [ProductBrandController],
  providers: [ProductBrandService],
  exports: [ProductBrandService],
})
export class ProductBrandModule {}
