import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./image/model/image.model";
import { ImageModule } from "./image/image.module";
import { District } from "./district/model/district.model";
import { DistrictModule } from "./district/district.module";
import { Region } from "./region/model/region.model.dto";
import { RegionModule } from "./region/region.module";


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Image,District,Region],
      autoLoadModels: true,
      logging: false,
    }),
    ImageModule,
    DistrictModule,
    RegionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
