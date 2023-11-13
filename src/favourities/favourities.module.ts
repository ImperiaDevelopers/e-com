import { Module } from '@nestjs/common';
import { FavouritiesService } from './favourities.service';
import { FavouritiesController } from './favourities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Favourity } from './models/favourity.model';

@Module({
  imports: [SequelizeModule.forFeature([Favourity]), JwtModule.register({})],
  controllers: [FavouritiesController],
  providers: [FavouritiesService],
})
export class FavouritiesModule {}
