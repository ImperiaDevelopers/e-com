import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Performance } from './models/performance.model';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectModel(Performance) private PerformanceRepo: typeof Performance,
  ) {}

  //Create performance
  async createPerformance(createPerformanceDto: CreatePerformanceDto) {
    const newPerformance = await this.PerformanceRepo.create({
      ...createPerformanceDto,
    });
    const response = {
      message: 'Performance successfully created',
      performance: newPerformance,
    };
    return response;
  }

  //Get all performances
  async getAllPerformances() {
    const performances = await this.PerformanceRepo.findAll({
      include: { all: true },
    });
    if (performances.length) return performances;
    throw new NotFoundException('Any performances not found or smt is wrong');
  }

  //Get performance by id
  async getPerformanceById(id: number) {
    const performance = await this.PerformanceRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (performance) return performance;
    throw new NotFoundException(
      'Performances not found at this id or smt is wrong',
    );
  }

  //Update performance by id
  async updatePerformanceById(
    id: number,
    updatePerformanceDto: UpdatePerformanceDto,
  ) {
    const performance = await this.PerformanceRepo.findByPk(id);
    if (performance) {
      const updating = await this.PerformanceRepo.update(updatePerformanceDto, {
        where: { id: id },
        returning: true,
      });
      return updating;
    }
    throw new NotFoundException(
      'Performances not found at this id or smt is wrong',
    );
  }

  //Delete performance by id
  async deletePerformanceById(id: number) {
    const performance = await this.PerformanceRepo.findOne({
      where: { id: id },
    });
    if (performance) {
      const deleting = await this.PerformanceRepo.destroy({
        where: { id: id },
      });
      return deleting;
    }
    throw new NotFoundException(
      'Performances not found at this id or smt is wrong',
    );
  }
}
