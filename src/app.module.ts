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
import { Sale } from './sale/models/sale.model';
import { Status } from './status/models/status.model';
import { Payment } from './payment/models/payment.model';
import { ProductModel } from './product_model/models/product_model.model';
import { PaymentModule } from './payment/payment.module';
import { StatusModule } from './status/status.module';
import { ProductInStockModule } from './product_in_stock/product_in_stock.module';
import { ProductInStock } from './product_in_stock/models/product_in_stock.model';
import { CategoryModule } from './category/category.module';
import { PerformanceModule } from './performance/performance.module';
import { Performance } from './performance/models/performance.model';
import { OrderModule } from './order/order.module';
import { Order } from './order/models/order.model';
import { ProCatBrandModule } from './pro_cat_brand/pro_cat_brand.module';
import { ProInfoModule } from './pro_info/pro_info.module';
import { ProCatBrand } from './pro_cat_brand/models/pro_cat_brand.model';
import { ProductBrand } from './product_brand/models/product_brand.model';
import { FavouritiesModule } from './favourities/favourities.module';
import { ClientModule } from './client/client.module';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/models/otp.model';
import { ProPerfomanceGroup } from './pro_perfomance_group/models/pro_perfomance_group.model';
import { ProPerfomanceGroupModule } from './pro_perfomance_group/pro_perfomance_group.module';
import { Deliver } from './deliver/models/deliver.model';
import { DeliverModule } from './deliver/deliver.module';
import { Region } from './region/model/region.model';
import { District } from './district/model/district.model';
import { Image } from './image/model/image.model';
import { DistrictModule } from './district/district.module';
import { ImageModule } from './image/image.module';
import { Card } from './card/models/card.model';
import { CardModule } from './card/card.module';
import { Client } from './client/models/client.model';
import { Favourity } from './favourities/models/favourity.model';
import { RegionModule } from './region/region.module';

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
        Card,
        Client,
        Comment,
        Deliver,
        District,
        Favourity,
        Image,
        Order,
        Otp,
        Payment,
        ProInfo,
        Product,
        ProductBrand,
        ProductModel,
        ProductInStock,
        Performance,
        ProCatBrand,
        ProPerfomanceGroup,
        Region,
        Sale,
        Status,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    CategoryModule,
    CommentModule,
    CardModule,
    ClientModule,
    DeliverModule,
    DistrictModule,
    ImageModule,
    FavouritiesModule,
    OrderModule,
    OtpModule,
    PaymentModule,
    ProductModule,
    ProductModelModule,
    ProPerfomanceGroupModule,
    ProductInStockModule,
    PerformanceModule,
    ProductBrandModule,
    ProCatBrandModule,
    ProPerfomanceGroupModule,
    ProInfoModule,
    RegionModule,
    SaleModule,
    StatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
