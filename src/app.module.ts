import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { ProductBrandModule } from './product_brand/product_brand.module';
import { Comment } from './comment/models/comment.model';
import { CommentModule } from './comment/comment.module';
import { SaleModule } from './sale/sale.module';
import { ProductModelModule } from './product_model/product_model.module';
import { ProInfo } from './pro_info/models/pro_info.model';
import { ProInfoModule } from './pro_info/pro_info.module';
import { Sale } from './sale/models/sale.model';
import { Status } from './status/models/status.model';
import { Payment } from './payment/models/payment.model';
import { ProductBrand } from './product_brand/models/product_brand.model';
import { ProductModel } from './product_model/models/product_model.model';
import { PaymentModule } from './payment/payment.module';
import { StatusModule } from './status/status.module';
import { ProductInStockModule } from './product_in_stock/product_in_stock.module';
import { ProductInStock } from './product_in_stock/models/product_in_stock.model';

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
      models: [
        Admin,
        Comment,
        Payment,
        ProInfo,
        Product,
        ProductBrand,
        ProductModel,
        ProductInStock,
        Sale,
        Status,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    CommentModule,
    PaymentModule,
    ProInfoModule,
    ProductModule,
    ProductBrandModule,
    ProductModelModule,
    SaleModule,
    StatusModule,
    ProductInStockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
