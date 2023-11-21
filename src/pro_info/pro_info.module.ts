import { Module } from '@nestjs/common';
import { ProInfoService } from './pro_info.service';
import { JwtModule } from '@nestjs/jwt';
import { ProInfoController } from './pro_info.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProInfo } from './models/pro_info.model';

@Module({
  imports: [SequelizeModule.forFeature([ProInfo]), JwtModule.register({})],
  controllers: [ProInfoController],
  providers: [ProInfoService],
})
export class ProInfoModule {}
