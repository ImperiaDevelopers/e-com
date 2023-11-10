import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
<<<<<<< HEAD
import { Admin } from './admin/models/admin.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { ProductBrandModule } from './product_brand/product_brand.module';
import { Comment } from './comment/models/comment.model';
import { CommentModule } from './comment/comment.module';
=======
import { ProInfoModule } from './pro_info/pro_info.module';
>>>>>>> c12ca04d5ac81762bc9f2424c2e4a7092e8631eb

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
      models: [Admin, Product, Comment],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
<<<<<<< HEAD
    ProductModule,
    ProductBrandModule,
    CommentModule,
=======
    ProInfoModule,
>>>>>>> c12ca04d5ac81762bc9f2424c2e4a7092e8631eb
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
