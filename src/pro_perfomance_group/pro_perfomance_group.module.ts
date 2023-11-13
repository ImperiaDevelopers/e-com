import { Module } from '@nestjs/common';
import { ProPerfomanceGroupService } from './pro_perfomance_group.service';
import { ProPerfomanceGroupController } from './pro_perfomance_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProPerfomanceGroup } from './models/pro_perfomance_group.model';

@Module({
  imports: [SequelizeModule.forFeature([ProPerfomanceGroup])],
  controllers: [ProPerfomanceGroupController],
  providers: [ProPerfomanceGroupService],
  exports: [ProPerfomanceGroupService],
})
export class ProPerfomanceGroupModule {}
