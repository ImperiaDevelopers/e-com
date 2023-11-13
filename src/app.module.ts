import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { ProInfo } from './pro_info/models/pro_info.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { ProductBrandModule } from './product_brand/product_brand.module';
import { Comment } from './comment/models/comment.model';
import { CommentModule } from './comment/comment.module';
import { ProCatBrandModule } from './pro_cat_brand/pro_cat_brand.module';
import { ProInfoModule } from './pro_info/pro_info.module';
import { ProCatBrand } from './pro_cat_brand/models/pro_cat_brand.model';
import { ProductBrand } from './product_brand/models/product_brand.model';
import { FavouritiesModule } from './favourities/favourities.module';
import { ClientModule } from './client/client.module';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/models/otp.model';

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
        Product,
        Comment,
        ProInfo,
        ProCatBrand,
        ProductBrand,
        Otp,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    ProInfoModule,
    ProductModule,
    ProductBrandModule,
    CommentModule,
    OtpModule,
    ProCatBrandModule,
    FavouritiesModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
