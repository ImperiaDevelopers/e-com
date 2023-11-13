import { Module } from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { DeliverController } from './deliver.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deliver } from './models/deliver.model';

@Module({
  imports: [SequelizeModule.forFeature([Deliver])],
  controllers: [DeliverController],
  providers: [DeliverService],
})
export class DeliverModule {}
