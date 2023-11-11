import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { ProductBrandModule } from './product_brand/product_brand.module';
import { CategoryModule } from './category/category.module';
import { PerformanceModule } from './performance/performance.module';
import { Performance } from './performance/models/performance.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Admin, Product, Performance],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    ProductModule,
    ProductBrandModule,
    CategoryModule,
    PerformanceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
