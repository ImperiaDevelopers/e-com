import { Module } from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { PerformanceController } from './performance.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Performance } from './models/performance.model';

@Module({
  imports: [SequelizeModule.forFeature([Performance])],
  controllers: [PerformanceController],
  providers: [PerformanceService],
  exports: [PerformanceService],
})
export class PerformanceModule {}
