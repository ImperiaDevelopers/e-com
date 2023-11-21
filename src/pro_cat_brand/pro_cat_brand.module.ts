import { Module } from '@nestjs/common';
import { ProCatBrandService } from './pro_cat_brand.service';
import { ProCatBrandController } from './pro_cat_brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ProCatBrand } from './models/pro_cat_brand.model';

@Module({
  imports: [SequelizeModule.forFeature([ProCatBrand]), JwtModule.register({})],
  controllers: [ProCatBrandController],
  providers: [ProCatBrandService],
})
export class ProCatBrandModule {}
