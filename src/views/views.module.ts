import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { View } from './models/view.model';

@Module({
  imports: [SequelizeModule.forFeature([View])],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
